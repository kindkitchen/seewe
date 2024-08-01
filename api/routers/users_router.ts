import { createRoute, OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { append_user } from "../middlewares/append_user.middleware.ts"
import { users_service } from "../services/users_service.ts"
import { UserDto } from "../dto/user.dto.ts"
import { HTTPException } from "hono/http-exception"
import { authenticated_only } from "../middlewares/authenticated_only.spread.ts"

const get_list = createRoute({
  method: "get",
  path: "/",
  ...authenticated_only,
  request: {},
  middleware: [append_user],
  responses: {
    200: {
      description: "Return a list of users",
      content: {
        "application/json": {
          schema: z.object({
            users: z.array(UserDto),
          }),
        },
      },
    },
  },
})

const router = new OpenAPIHono()

router.openapi(get_list, async (ctx) => {
  const result = await users_service.list()

  if (!result.ok) {
    throw new HTTPException(500, { message: "unable to get user's list" })
  }

  return ctx.json({
    users: result.data,
  })
})

router.use(append_user)

export const users_router = router
