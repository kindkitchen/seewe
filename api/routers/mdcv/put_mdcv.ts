import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"
import { MdCvDto } from "../../dto/md-cv.dto.ts"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"

export const put_mdcv = authenticated_only_wrapper(createRoute({
  method: "put",
  path: "/:mdcv_id",
  request: {
    params: z.object({
      mdcv_id: z.string().transform(Number),
    }),
    body: {
      content: {
        "application/json": {
          schema: MdCvDto.omit({
            _id: true,
            as_default_by_user_id: true,
            as_default_by_username: true,
            as_regulary_by_name_username: true,
            user_id: true,
          }).merge(z.object({
            make_default: z.boolean(),
          })).partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: "CV updated",
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
