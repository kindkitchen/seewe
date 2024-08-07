import { createRoute } from "@hono/zod-openapi"

export const post_logout = createRoute({
  method: "post",
  path: "/logout",
  responses: {
    204: {
      description: "Success logout (no content)",
    },
  },
})
