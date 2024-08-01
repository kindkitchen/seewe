import { createRoute } from "@hono/zod-openapi"
import { z } from "zod"
import { authenticated_only } from "../../middlewares/authenticated_only.spread.ts"
import { append_user } from "../../middlewares/append_user.middleware.ts"
import { MdCvDto } from "../../dto/md-cv.dto.ts"

export const post_mdCv = createRoute({
  path: "/",
  method: "post",
  ...authenticated_only,
  middleware: [append_user],
  request: {
    body: {
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
