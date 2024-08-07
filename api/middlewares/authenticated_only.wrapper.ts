import { createRoute } from "@hono/zod-openapi"
import { z, ZodObject, ZodRawShape } from "zod"
import { append_user } from "./append_user.middleware.ts"
import { UserEntity } from "../dto/user.dto.ts"

export type AuthenticatedHono = { Variables: { user: UserEntity } }
export const authenticated_only_wrapper = <
  T extends ReturnType<typeof createRoute>,
>(route_definition: T): T => {
  if (route_definition.security) {
    route_definition.security.push({ Bearer: [] })
  } else {
    route_definition.security = [
      {
        Bearer: [],
      },
    ]
  }

  const AuthorizationHeaderSchema = z.object({
    authorization: z.string().optional(),
  })

  if (route_definition.request) {
    if (route_definition.request.headers) {
      ;(route_definition.request.headers as ZodObject<ZodRawShape>).merge(
        AuthorizationHeaderSchema,
      )
    } else {
      route_definition.request.headers = AuthorizationHeaderSchema
    }
  } else {
    route_definition.request = {
      headers: AuthorizationHeaderSchema,
    }
  }

  if (
    route_definition.middleware && Array.isArray(route_definition.middleware)
  ) {
    route_definition.middleware.push(append_user)
  } else if (route_definition.middleware) {
    throw new Error("no place for 'append_user' middleware... use array")
  } else {
    route_definition.middleware = [append_user]
  }

  return route_definition
}
