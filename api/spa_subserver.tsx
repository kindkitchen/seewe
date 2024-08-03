// deno-lint-ignore-file require-await
import { createRoute, OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { users_service } from "./services/users_service.ts"
import { serve_static } from "./utils/serve_static.ts"

export const spa_subserver = new OpenAPIHono()
  .get("/id/:user_id", async (ctx) => {
    const user_id_param = ctx.req.param("user_id")
    const validation = z
      .string()
      .regex(/\d{4, 20}/)
      .transform(Number)
      .safeParse(user_id_param)

    if (validation.error) {
      return ctx.notFound()
    }

    const db_result = await users_service.find_by_id(validation.data)

    if (!db_result.ok) {
      return ctx.notFound()
    }

    const user = db_result.data

    return ctx.html(<h1>{user.email}</h1>)
  })
  .get("/:username/:cv_name", async (ctx) => {
    return ctx.notFound()
  })
  .get("/:username", async (ctx) => {
    return ctx.notFound()
  })
  .get("*", serve_static)
