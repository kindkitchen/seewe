import { BearerTokenSchema } from "../dto/auth.dto.ts"
import { type User } from "../dto/user.dto.ts"
import { verify_jwt } from "../utils/jwt.util.ts"
import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"
import { users_service } from "../services/users_service.ts"

export const append_user = createMiddleware<{
  Variables: {
    user: User & Required<Pick<User, "id">>
  }
}>(async (ctx, next) => {
  const authorization = ctx.req.header("Authorization")

  if (!authorization) {
    throw new HTTPException(401, {
      message: "Authorization header is required",
    })
  }
  const token = BearerTokenSchema.parse(authorization)
  const verified = await verify_jwt({
    token,
    publicKeyPem: "ACCESS_TOKEN_PUBLIC_KEY",
  })

  if (!verified) {
    throw new HTTPException(401, {
      message: "Invalid token",
    })
  }

  const result = await users_service.find_by_id(verified.sub!)

  if (!result.ok) {
    throw new HTTPException(500, { message: "User not found" })
  }

  ctx.set("user", result.data)

  await next()
})
