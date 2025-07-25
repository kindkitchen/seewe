import { OpenAPIHono } from "@hono/zod-openapi"
import { HTTPException } from "hono/http-exception"
import { AuthenticatedHono } from "../../middlewares/authenticated_only.wrapper.ts"
import { users_service } from "../../services/users_service.ts"
import { post_add_nik } from "./post_add_nik.ts"
import { put_update_nik } from "./put_update_nik.ts"

const router = new OpenAPIHono<AuthenticatedHono>()
  .openapi(post_add_nik, async (ctx) => {
    const { nik } = ctx.req.valid("json")
    const user = ctx.get("user")
    const result = await users_service.add_nik(nik, user)

    if (result.ok) {
      return ctx.json({
        ok: true,
        data: nik,
      })
    }

    if (result.data) {
      throw new HTTPException(400, { message: result.data })
    } else {
      throw new HTTPException(500, { message: "Failed to add nik" })
    }
  }).openapi(put_update_nik, async (ctx) => {
    const user = ctx.get("user")
    const { nik } = ctx.req.valid("param")
    await users_service.update_nik(nik, user)

    return ctx.json({
      ok: true,
      data: nik,
    })
  })

export const users_router = router
