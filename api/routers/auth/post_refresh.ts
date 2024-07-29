import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"
import { BearerTokenSchema, SuccessSignInSchema } from "../../dto/auth.dto.ts"

export const post_refresh = createRoute({
  method: "post",
  path: "/refresh",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: z.object({
            refresh_token: BearerTokenSchema,
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success refresh token",
      content: {
        "application/json": {
          schema: SuccessSignInSchema,
        },
      },
    },
  },
})
