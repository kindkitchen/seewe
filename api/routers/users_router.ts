import { createRoute, OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { append_user } from "../middlewares/append_user.middleware.ts"
import { users_service } from "../services/users_service.ts"
import { UserDto } from "../dto/user.dto.ts"

const get_list = createRoute({
  method: "get",
  path: "/",
  security: [
    {
      Bearer: [],
    },
  ],
  request: {},
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

router.use(append_user)
router.openapi(get_list, async (ctx) => {
  return ctx.json({
    users: await users_service.list(),
  })
})

router.use(append_user)

export const users_router = router
