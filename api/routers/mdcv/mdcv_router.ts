import { OpenAPIHono } from "@hono/zod-openapi"
import { HTTPException } from "hono/http-exception"
import { db } from "../../db.ts"
import { MdCvEntity } from "../../dto/md-cv.dto.ts"
import { AuthenticatedHono } from "../../middlewares/authenticated_only.wrapper.ts"
import { mdCv_service } from "../../services/md-cv_service.ts"
import { delete_mdcv } from "./delete_mdcv.ts"
import { get_mdcv } from "./get_mdcv.ts"
import { post_mdcv } from "./post_mdcv.ts"
import { put_mdcv } from "./put_mdcv.ts"

export const mdcv_router = new OpenAPIHono<AuthenticatedHono>()
  .openapi(post_mdcv, async (ctx) => {
    const user = ctx.get("user")
    const mdcv = ctx.req.valid("json")
    if (mdcv.make_default) {
      const res = await mdCv_service.save_as_default({
        ...mdcv,
        user_id: user._id,
      }, user)
      if (res.ok) {
        return ctx.json({
          _id: res.data,
        })
      } else {
        throw new HTTPException(500, { message: "Failed to save" })
      }
    } else {
      if (!user.nik) {
        throw new HTTPException(400, {
          message:
            "User has no nik. It means he can only have single default CV",
        })
      } else if (!mdcv.name) {
        throw new HTTPException(400, {
          message: "To save CV as non-default, name is required",
        })
      }
      const res = await mdCv_service.save({
        ...mdcv,
        user_id: user._id,
      }, user)

      if (res.ok) {
        return ctx.json({
          _id: res.data,
        })
      } else {
        throw new HTTPException(500, { message: "Failed to save" })
      }
    }
  }).openapi(put_mdcv, async (ctx) => {
    const user = ctx.get("user")
    const { mdcv_id } = ctx.req.valid("param")
    const mdcv_db_res = await db._dev_md_cv.findByPrimaryIndex("_id", mdcv_id)
    const mdcv = mdcv_db_res?.value

    if (!mdcv) {
      throw new HTTPException(404, { message: "CV not found" })
    } else if (mdcv.user_id !== user._id) {
      throw new HTTPException(403, { message: "Forbidden" })
    }

    const update_data = ctx.req.valid("json")
    const res = await mdCv_service.update(mdcv_id, update_data)

    return ctx.json(res)
  }).openapi(get_mdcv, async (ctx) => {
    const user = ctx.get("user")
    const { mdcv_id } = ctx.req.valid("param")
    const mdcv_db_res = await db._dev_md_cv.findByPrimaryIndex("_id", mdcv_id)
    const mdcv = mdcv_db_res?.value

    if (!mdcv) {
      throw new HTTPException(404, { message: "CV not found" })
    } else if (mdcv.user_id !== user._id) {
      throw new HTTPException(403, { message: "Forbidden" })
    }

    return ctx.json(mdcv as MdCvEntity)
  }).openapi(delete_mdcv, async (ctx) => {
    const user = ctx.get("user")
    const { mdcv_id } = ctx.req.valid("param")
    const mdcv_db_res = await db._dev_md_cv.findByPrimaryIndex("_id", mdcv_id)
    const mdcv = mdcv_db_res?.value

    if (!mdcv) {
      throw new HTTPException(404, { message: "CV not found" })
    } else if (mdcv.user_id !== user._id) {
      throw new HTTPException(403, { message: "Forbidden" })
    }

    await db._dev_md_cv.deleteByPrimaryIndex("_id", mdcv_id)

    return ctx.newResponse(null, 204)
  })
