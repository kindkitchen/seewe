import { createRoute } from "@hono/zod-openapi"

export const get_mdcv_by_user_id = createRoute({
  method: "get",
  path: "/id/:user_id",
  responses: {
    200: {
      description: "Show CV",
      content: {
        "text/html": { schema: {} },
      },
    },
  },
})
