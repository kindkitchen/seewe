import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"

// Remove the pdf and revert the cv to markdown rendering. The stored `md` is
// kept, so this is a non-destructive switch back.
export const delete_mdcv_pdf = authenticated_only_wrapper(createRoute({
  method: "delete",
  path: "/:mdcv_id/pdf",
  request: {
    params: z.object({
      mdcv_id: z.number({ coerce: true }),
    }),
  },
  responses: {
    204: { description: "PDF removed; cv reverted to markdown" },
  },
}))
