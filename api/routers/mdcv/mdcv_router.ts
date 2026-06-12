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
import { put_default } from "./put_default.ts"
import { get_my_mdcvs } from "./get_my_mdcvs.ts"
import { put_mdcv_pdf } from "./put_mdcv_pdf.ts"
import { delete_mdcv_pdf } from "./delete_mdcv_pdf.ts"

const MAX_PDF_BYTES = 5 * 1024 * 1024
// %PDF- magic header
const is_pdf = (b: Uint8Array) =>
  b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 &&
  b[4] === 0x2d

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
    const res = await mdCv_service.update(mdcv_id, {
      ...update_data,
      // a named cv's public slug is [nik, name]; keep it in sync on rename
      ...(update_data.name && user.nik && mdcv.as_regulary_by_name_username
        ? { as_regulary_by_name_username: [user.nik, update_data.name] }
        : {}),
    })

    return ctx.json(res)
  }).openapi(put_default, async (ctx) => {
    const user = ctx.get("user")
    const { mdcv_id } = ctx.req.valid("param")
    const { is_default } = ctx.req.valid("json")

    if (!user.nik) {
      throw new HTTPException(400, {
        message: "User without username can only have a single default CV",
      })
    }

    const res = await mdCv_service.toggle_default(is_default, {
      mdcv_id,
      user,
    })

    if (!res.ok) {
      throw new HTTPException(404, { message: "CV not found" })
    }

    return ctx.json({ ok: true, data: null })
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
  }).openapi(get_my_mdcvs, async (ctx) => {
    const user = ctx.get("user")
    const mdcvs = await db._dev_md_cv.findBySecondaryIndex("user_id", user._id)

    return ctx.json({
      items: mdcvs.result.map((mdcv) => mdcv.value as MdCvEntity),
    })
  }).openapi(put_mdcv_pdf, async (ctx) => {
    const user = ctx.get("user")
    const { mdcv_id } = ctx.req.valid("param")
    const mdcv_db_res = await db._dev_md_cv.findByPrimaryIndex("_id", mdcv_id)
    const mdcv = mdcv_db_res?.value

    if (!mdcv) {
      throw new HTTPException(404, { message: "CV not found" })
    } else if (mdcv.user_id !== user._id) {
      throw new HTTPException(403, { message: "Forbidden" })
    }

    const bytes = new Uint8Array(await ctx.req.arrayBuffer())
    if (bytes.byteLength === 0) {
      throw new HTTPException(400, { message: "Empty body" })
    } else if (bytes.byteLength > MAX_PDF_BYTES) {
      throw new HTTPException(413, { message: "PDF too large (max 5MB)" })
    } else if (!is_pdf(bytes)) {
      throw new HTTPException(400, { message: "Not a PDF file" })
    }

    const res = await mdCv_service.set_pdf({
      mdcv_id,
      bytes,
      filename: ctx.req.header("x-filename"),
    })
    if (!res.ok) {
      throw new HTTPException(500, { message: "Failed to store PDF" })
    }

    return ctx.json({ ok: true })
  }).openapi(delete_mdcv_pdf, async (ctx) => {
    const user = ctx.get("user")
    const { mdcv_id } = ctx.req.valid("param")
    const mdcv_db_res = await db._dev_md_cv.findByPrimaryIndex("_id", mdcv_id)
    const mdcv = mdcv_db_res?.value

    if (!mdcv) {
      throw new HTTPException(404, { message: "CV not found" })
    } else if (mdcv.user_id !== user._id) {
      throw new HTTPException(403, { message: "Forbidden" })
    }

    await mdCv_service.remove_pdf(mdcv_id)

    return ctx.newResponse(null, 204)
  })
