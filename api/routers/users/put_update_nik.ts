import { createRoute } from "@hono/zod-openapi"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"
import { z } from "zod"

export const put_update_nik = authenticated_only_wrapper(createRoute({
  method: "put",
  path: "/nik/:nik",
  request: {
    params: z.object({
      nik: z.string().regex(/[\w_-]{3,16}/),
    }),
  },
  responses: {
    200: {
      description: "Successfully updated nik for user",
      content: {
        "application/json": {
          schema: z.object({
            ok: z.boolean(),
            data: z.union([z.null(), z.string()]),
          }),
        },
      },
    },
  },
}))
