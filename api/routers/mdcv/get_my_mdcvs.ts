import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"
import { MdCvEntityDto } from "../../dto/md-cv.dto.ts"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"

export const get_my_mdcvs = authenticated_only_wrapper(createRoute({
  method: "get",
  path: "/",
  request: {},
  responses: {
    200: {
      description: "All CVs for owner",
      content: {
        "application/json": {
          schema: z.object({
            items: z.array(MdCvEntityDto),
          }),
        },
      },
    },
  },
}))
