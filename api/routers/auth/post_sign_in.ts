import { createRoute } from "@hono/zod-openapi"
import { AuthSchema, SuccessSignInSchema } from "../../dto/auth.dto.ts"

export const post_sign_in = createRoute({
  method: "post",
  path: "/sign-in",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: AuthSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description:
        "Success user upsert (auto sign-in/up) return fresh jwt token pair.",
      content: {
        "application/json": {
          schema: SuccessSignInSchema,
        },
      },
    },
  },
})
