import { OpenAPIHono } from "@hono/zod-openapi"
import { HTTPException } from "hono/http-exception"
import { UserEntity } from "../../dto/user.dto.ts"
import { mdCv_service } from "../../services/md-cv_service.ts"
import { post_mdCv } from "./post_md-cv.ts"
import { get_published_mdCv } from "./get_published_md-cv.ts"
import { authenticated_only_wrapper } from "../../middlewares/authenticated_only.wrapper.ts"

export const mdCv_router = new OpenAPIHono<{
  Variables: {
    user: UserEntity
  }
}>()
  .openapi(get_published_mdCv, async (ctx) => {
    const slug = ctx.req.valid("param").slug
    const cv = await mdCv_service.find_by_id(+slug)

    return ctx.text(cv.data?.html || "ooops... something went wrong")
  })
  .openapi(authenticated_only_wrapper(post_mdCv), async (ctx) => {
    const user = ctx.get("user")
    const data = ctx.req.valid("json")
    const result = await mdCv_service.insert({
      ...data,
      user_id: user._id,
    })

    if (!result.ok) {
      throw new HTTPException(500, { message: "unable to save mdCv" })
    }

    return ctx.json({
      _id: result.data,
    })
  })
