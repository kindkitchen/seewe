import { createRoute } from "@hono/zod-openapi"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"
import { z } from "zod"

export const delete_mdcv = authenticated_only_wrapper(createRoute({
  method: "delete",
  path: "/:mdcv_id",
  request: {
    params: z.object({
      mdcv_id: z.number({ coerce: true }),
    }),
  },
  responses: {
    204: {
      description: "CV deleted (no content)",
    },
  },
}))
