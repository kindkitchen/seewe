import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"
import { MdCvDto } from "../../dto/md-cv.dto.ts"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"

export const post_mdcv = authenticated_only_wrapper(createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      required: true,
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
          })),
        },
      },
    },
  },
  responses: {
    200: {
      description: "CV created",
      content: {
        "application/json": {
          schema: z.object({
            _id: z.number(),
          }),
        },
      },
    },
  },
}))
