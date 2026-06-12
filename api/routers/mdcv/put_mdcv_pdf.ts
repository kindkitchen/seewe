import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"

// Upload (or replace) the pdf for a cv. The body is the raw pdf bytes
// (`Content-Type: application/pdf`); an optional `x-filename` header sets the
// download name. Read manually via `ctx.req.arrayBuffer()` rather than zod body
// validation, since the payload is binary.
export const put_mdcv_pdf = authenticated_only_wrapper(createRoute({
  method: "put",
  path: "/:mdcv_id/pdf",
  request: {
    params: z.object({
      mdcv_id: z.number({ coerce: true }),
    }),
    body: {
      required: true,
      content: {
        "application/pdf": {
          schema: z.string().openapi({ format: "binary" }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "PDF stored; cv switched to pdf representation",
      content: {
        "application/json": {
          schema: z.object({ ok: z.boolean() }),
        },
      },
    },
    400: { description: "Empty body or not a pdf" },
    413: { description: "PDF exceeds the size limit" },
  },
}))
