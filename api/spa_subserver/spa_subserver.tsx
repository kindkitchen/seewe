import { OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { db } from "../db.ts"
import { users_service } from "../services/users_service.ts"
import { serve_static } from "../utils/serve_static.ts"

export const spa_subserver = new OpenAPIHono()
  .get("/id/:user_id", async (ctx) => {
    const user_id_param = ctx.req.param("user_id")
    const validation = z
      .string()
      // .regex(/\d{4, 20}/) // TODO
      .transform(Number)
      .safeParse(user_id_param)

    if (validation.error) {
      return ctx.notFound()
    }
    const user_id = validation.data

    const db_result = await db._dev_md_cv.findByPrimaryIndex("as_default_by_user_id", user_id)
    const cv = db_result?.value

    // cv not found
    if (!cv) {
      const db_user_res = await users_service.find_by_id(user_id)
      const target_user = db_user_res.data

      // check if user has nik and so maybe not default cvs
      if (target_user) {
        const { result: public_not_default_cv_list } = await db._dev_md_cv.findBySecondaryIndex(
          "user_id",
          user_id,
          {
            filter: ({ value }) => value.is_published,
          },
        )

        if (public_not_default_cv_list.length > 0) {
          return ctx.redirect("/" + db_user_res.data.nik)
        }
      }

      // nothing to show
      return ctx.notFound()
    }

    if (ctx.req.header("authorization")) {
      // TODO: if it is owner - add extra functional
    }

    // if user already has username this cv should be found by username
    if (cv.as_default_by_username) {
      return ctx.redirect("/" + cv.as_default_by_username)
    }

    return ctx.html(
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: cv.html,
          }}
        ></div>
      </>,
    )
  })
  .get("/:username/:cv_name", async (ctx) => {
    return ctx.notFound()
  })
  .get("/:username", async (ctx) => {
    return ctx.notFound()
  })
  .get("*", serve_static)
