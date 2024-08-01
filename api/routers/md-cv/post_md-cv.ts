import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"
import { MdCvDto } from "../../dto/md-cv.dto.ts"

export const post_mdCv = createRoute({
  path: "/",
  method: "post",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: MdCvDto,
        },
      },
    },
  },
  responses: {
    200: {
      description:
        "The markdown is successfully saved and associated with current user",
      content: {
        "application/json": {
          schema: z.object({
            _id: z.number(),
          }),
        },
      },
    },
  },
})
