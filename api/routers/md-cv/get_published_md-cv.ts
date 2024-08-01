import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"

export const get_published_mdCv = createRoute({
  method: "get",
  path: "/:slug",
  request: {
    params: z.object({
      slug: z.string(),
    }),
  },
  responses: {
    200: {
      description: "CV as raw html",
      content: {
        "text/plain": {
          schema: z.string(),
        },
      },
    },
  },
})
