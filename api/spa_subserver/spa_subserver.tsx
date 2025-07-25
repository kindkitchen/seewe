import { OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { config } from "../config.ts"
import { db } from "../db.ts"
import { users_service } from "../services/users_service.ts"
import { serve_static } from "../utils/serve_static.ts"
import { SimpleLayout } from "../utils/SimpleLayout.tsx"

export const spa_subserver = new OpenAPIHono()
  .get("/id/:user_id", async (ctx) => {
    const user_id_param = ctx.req.param("user_id")
    const validation = z.number({ coerce: true }).safeParse(user_id_param)

    if (validation.error) {
      return ctx.notFound()
    }
    const user_id = validation.data

    const db_result = await db._dev_md_cv.findByPrimaryIndex(
      "as_default_by_user_id",
      user_id,
    )
    const cv = db_result?.value

    // cv not found
    if (!cv) {
      const db_user_res = await users_service.find_by_id(user_id)
      const target_user = db_user_res.data

      // check if user has nik and so maybe not default cvs
      if (target_user?.nik) {
        return ctx.redirect("/" + db_user_res.data.nik)
      }

      // nothing to show
      return ctx.notFound()
    }

    // if user already has username this cv should be found by username
    if (cv.as_default_by_username) {
      return ctx.redirect("/" + cv.as_default_by_username)
    }

    const { html, md, ...rest } = cv
    const link = config.VITE_API_URL + "/id/" + user_id
    return ctx.html(
      <SimpleLayout link={link}>
        <div
          dangerouslySetInnerHTML={{
            __html: cv.html,
          }}
        />
      </SimpleLayout>,
    )
  })
  .get("/:username/:cv_name", async (ctx) => {
    const { cv_name, username } = ctx.req.param()
    const happy_path_result = await db._dev_md_cv.findByPrimaryIndex(
      "as_regulary_by_name_username",
      [username, cv_name],
    )

    if (happy_path_result?.value) {
      const link = config.VITE_API_URL + "/" + username + "/" + cv_name

      console.log(happy_path_result.value.html)

      return ctx.html(
        <SimpleLayout link={link}>
          <div
            dangerouslySetInnerHTML={{
              __html: happy_path_result.value.html,
            }}
          />
        </SimpleLayout>,
      )
    }

    const db_user_res = await users_service.find_by_nik(username)
    const target_user = db_user_res.data

    if (target_user) {
      return ctx.redirect("/" + target_user.nik)
    }

    return ctx.notFound()
  })
  .get("/:username", async (ctx) => {
    const username = ctx.req.param("username")
    const happy_path_result = await db._dev_md_cv.findByPrimaryIndex(
      "as_default_by_username",
      username,
    )
    const happy = happy_path_result?.value

    if (happy) {
      const link = config.VITE_API_URL + "/" + username
      return ctx.html(
        <SimpleLayout link={link}>
          <div
            dangerouslySetInnerHTML={{
              __html: happy.html,
            }}
          />
        </SimpleLayout>,
      )
    }

    const db_user_res = await users_service.find_by_nik(
      ctx.req.param("username"),
    )
    const target_user = db_user_res.data

    if (target_user) {
      const { result: public_not_default_cv_list } = await db._dev_md_cv
        .findBySecondaryIndex(
          "user_id",
          target_user._id,
          {
            filter: ({ value }) => value.is_published,
          },
        )

      if (public_not_default_cv_list.length > 0) {
        const link = config.VITE_API_URL + "/" + target_user.nik!
        return ctx.html(
          <SimpleLayout link={link} print_pdf={false}>
            <p>
              {`This is ${
                target_user.nik || target_user.name
              } dashboard. Navigate to the site by this link:`}
            </p>
            <a href="https://seewe.deno.dev/navigate/to/visit/site">
              <h1>seewe.deno.dev</h1>
            </a>
            <p>Or continue explore profiles:</p>
            <hr />
            <h1>{target_user.nik || target_user.name}</h1>
            <ol>
              {public_not_default_cv_list.map(({ value }, i) => (
                <li key={value._id!}>
                  <a
                    href={config.VITE_API_URL + "/" + target_user.nik! + "/" +
                      (value.name || "")}
                  >
                    <h4>
                      {"CV"} {value.name ||
                        value.as_regulary_by_name_username?.join("/") ||
                        `no. ${value._id!}`}
                    </h4>
                  </a>
                </li>
              ))}
            </ol>
          </SimpleLayout>,
        )
      }
    }

    return ctx.notFound()
  })
  .get("*", serve_static)
