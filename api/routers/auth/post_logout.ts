import { createRoute } from "@hono/zod-openapi"
import { authenticated_only } from "../../middlewares/authenticated_only.spread.ts"

export const post_logout = createRoute({
  method: "post",
  path: "/logout",
  ...authenticated_only,
  responses: {
    204: {
      description: "Success logout (no content)",
    },
  },
})
