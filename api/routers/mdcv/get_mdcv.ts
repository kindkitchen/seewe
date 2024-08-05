import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"
import { MdCvEntityDto } from "../../dto/md-cv.dto.ts"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"

export const get_mdcv = authenticated_only_wrapper(createRoute({
  method: "get",
  path: "/:mdcv_id",
  request: {
    params: z.object({
      mdcv_id: z.string().transform(Number),
    }),
  },
  responses: {
    200: {
      description: "CV for owner",
      content: {
        "application/json": {
          schema: MdCvEntityDto,
        },
      },
    },
  },
}))
