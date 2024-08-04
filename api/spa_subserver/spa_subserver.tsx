import { OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { db } from "../db.ts"
import { DotenvFile } from "../env.d.ts"
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
    if (!cv) {
      return ctx.notFound()
    }

    if (ctx.req.header("authorization")) {
      // TODO
    }

    if (cv.name) {
      return ctx.redirect(Deno.env.get("VITE_API_URL" satisfies keyof DotenvFile)! + "/" + cv.name)
    }

    return ctx.html(
      <html>
        <div
          dangerouslySetInnerHTML={{
            __html: cv.html,
          }}
        ></div>
      </html>,
    )
  })
  .get("/:username/:cv_name", async (ctx) => {
    return ctx.notFound()
  })
  .get("/:username", async (ctx) => {
    return ctx.notFound()
  })
  .get("*", serve_static)
