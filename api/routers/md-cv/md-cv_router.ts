import { OpenAPIHono } from "@hono/zod-openapi"
import { UserEntity } from "../../dto/user.dto.ts"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"
import { get_published_mdCv } from "./get_published_md-cv.ts"
import { post_mdCv } from "./post_md-cv.ts"

export const mdCv_router = new OpenAPIHono<{
  Variables: {
    user: UserEntity
  }
}>()
  .openapi(get_published_mdCv, async (ctx) => {
    console.log("// TODO get_published_mdCv")

    return ctx.text("ooops... something went wrong")
  })
  .openapi(authenticated_only_wrapper(post_mdCv), async (ctx) => {
    console.log("// TODO post_mdCv")

    return ctx.json({
      _id: 911,
    })
  })
