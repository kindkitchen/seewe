import { OpenAPIHono } from "@hono/zod-openapi"
import { HTTPException } from "hono/http-exception"
import { generate_token_pair } from "../../services/auth_service.ts"
import { users_service } from "../../services/users_service.ts"
import { post_sign_in } from "./post_sign_in.ts"
import { post_refresh } from "./post_refresh.ts"
import { append_user } from "../../middlewares/append_user.middleware.ts"
import { post_logout } from "./post_logout.ts"
import {
  google_access_token_from_code,
  GoogleAccessTokenFromCodePayload,
  GoogleAuthJwtPayload,
} from "../../utils/google_auth.ts"
import { get_origin_of_the_req_sender } from "../../utils/get_origin_of_the_req_sender.util.ts"
import { decode_jwt, verify_jwt } from "../../utils/jwt.util.ts"
import { UserEntity } from "../../dto/user.dto.ts"

const router = new OpenAPIHono()

router
  .openapi(post_sign_in, async (ctx) => {
    const { code, client_id, auth_provider } = ctx.req.valid(
      "json",
    )
    const g_payload: GoogleAccessTokenFromCodePayload = {
      client_id,
      code,
      client_secret: Deno.env.get("GOOGLE_CLIENT_SECRET")!,
      grant_type: "authorization_code",
      redirect_uri: get_origin_of_the_req_sender(ctx.req.raw),
    }
    const g_res = await google_access_token_from_code(g_payload)
    const { payload } = decode_jwt<GoogleAuthJwtPayload>(g_res.id_token)

    const finsert_result = await users_service.finsert_by_email({
      email: payload.email,
      name: payload.given_name + " " + payload.family_name,
    })

    if (!finsert_result.ok) {
      throw new HTTPException(500, {
        cause: String(finsert_result.data),
        message: `Failed to sign in with ${auth_provider}`,
      })
    }

    const user = finsert_result.data
    const { access_token, refresh_token } = await generate_token_pair(user._id)

    return ctx.json({
      ...user,
      token_type: "Bearer" as const,
      access_token,
      refresh_token,
    })
  })
  .openapi(post_refresh, async (ctx) => {
    const { refresh_token: old_refresh_token } = ctx.req.valid("json")
    const verified = await verify_jwt({
      token: old_refresh_token,
      publicKeyPem: "REFRESH_TOKEN_PUBLIC_KEY",
    })

    if (!verified) {
      throw new HTTPException(401, {
        message: "Invalid token",
      })
    }

    const result = await users_service.find_by_id(+verified.sub!)

    if (!result.ok) {
      throw new HTTPException(500, { message: "User not found" })
    }

    const user = result.data
    const { access_token, refresh_token } = await generate_token_pair(user._id)

    return ctx.json({
      ...user,
      token_type: "Bearer" as const,
      access_token,
      refresh_token,
    })
  })

router.use(append_user)
;(router as OpenAPIHono<{ Variables: { user: UserEntity } }>).openapi(
  post_logout,
  async (ctx) => {
    const user = ctx.get("user")

    console.warn(
      await Promise.resolve(
        `User ${user.email} is logging out... all hope on frontent... // TODO: real logout`,
      ),
    )

    return ctx.newResponse(null, 204)
  },
)

export const auth_router = router
