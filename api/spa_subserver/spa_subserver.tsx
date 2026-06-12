import { OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import type { Context } from "hono"
import { config } from "../config.ts"
import { db } from "../db.ts"
import { mdCv_service } from "../services/md-cv_service.ts"
import { users_service } from "../services/users_service.ts"
import { serve_static } from "../utils/serve_static.ts"
import { SimpleLayout } from "../utils/SimpleLayout.tsx"
import { md_to_html } from "../utils/ui/utils/md-to-html.ts"

// A trailing `.pdf` on the last path segment means "serve the page and let the
// browser print it to PDF". We strip the suffix and flip on auto_print.
const parse_pdf = (raw: string) => {
  const auto_print = raw.endsWith(".pdf")
  return { value: auto_print ? raw.slice(0, -4) : raw, auto_print }
}

// the shape a resolved cv exposes to the serving helpers below.
type ServableCv = {
  _id?: number
  kind?: "md" | "pdf"
  pdf_version?: number
  md?: string
  css?: string
}

const open_pdf_cache = async () => {
  try {
    if (typeof caches === "undefined") return null
    return await caches.open("seewe-pdf-v1")
  } catch {
    return null
  }
}

const sanitize_filename = (name: string) => {
  const base = name.replace(/\.pdf$/i, "").replace(/[^a-z0-9._-]/gi, "_")
  return (base || "cv") + ".pdf"
}

// Serve the uploaded pdf for a "pdf"-kind cv. `auto_print` (the `.pdf` route)
// downloads as an attachment; otherwise it is shown inline in the browser's
// viewer. The response is read-through cached by `_id/pdf_version/variant`, so
// a hit skips the chunked blob read and a re-upload (new pdf_version) orphans
// the old entry. Returns null if the blob is missing (caller falls back to md).
const serve_pdf = async (
  cv: ServableCv,
  auto_print: boolean,
): Promise<Response | null> => {
  const variant = auto_print ? "dl" : "inline"
  const cache_key = `https://seewe.pdf-cache/${cv._id}/${
    cv.pdf_version ?? 0
  }/${variant}`
  const cache = await open_pdf_cache()
  if (cache) {
    const hit = await cache.match(cache_key)
    if (hit) return hit
  }

  const pdf = await mdCv_service.get_pdf(cv._id!)
  if (!pdf) return null

  const filename = sanitize_filename(pdf.filename || `cv-${cv._id}`)
  const res = new Response(pdf.bytes, {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": auto_print
        ? `attachment; filename="${filename}"`
        : "inline",
    },
  })
  if (cache) {
    try {
      await cache.put(cache_key, res.clone())
    } catch { /* cache is best-effort */ }
  }
  return res
}

// Single entry point for serving a resolved cv: a "pdf" cv returns its file,
// everything else renders markdown->html (with optional auto_print to pdf).
const render_cv = async (
  ctx: Context,
  cv: ServableCv,
  opts: { link: string; auto_print: boolean },
): Promise<Response> => {
  if ((cv.kind ?? "md") === "pdf") {
    const pdf_res = await serve_pdf(cv, opts.auto_print)
    if (pdf_res) return pdf_res
    // marked pdf but blob is gone -> degrade to markdown rendering
  }
  return ctx.html(
    <SimpleLayout link={opts.link} css={cv.css} auto_print={opts.auto_print}>
      <div
        class="cv"
        dangerouslySetInnerHTML={{ __html: md_to_html(cv.md ?? "") }}
      />
    </SimpleLayout>,
  )
}

export const spa_subserver = new OpenAPIHono()
  .get("/id/:user_id", async (ctx) => {
    const { value: user_id_raw, auto_print } = parse_pdf(
      ctx.req.param("user_id"),
    )
    const validation = z.number({ coerce: true }).safeParse(user_id_raw)

    if (validation.error) {
      return ctx.notFound()
    }
    const user_id = validation.data

    const db_result = await db._dev_md_cv.findByPrimaryIndex(
      "as_default_by_user_id",
      user_id,
    )
    const cv = db_result?.value

    // cv not found
    if (!cv) {
      const db_user_res = await users_service.find_by_id(user_id)
      const target_user = db_user_res.data

      // check if user has nik and so maybe not default cvs
      if (target_user?.nik) {
        return ctx.redirect("/" + db_user_res.data.nik)
      }

      // nothing to show
      return ctx.notFound()
    }

    // if user already has username this cv should be found by username
    if (cv.as_default_by_username) {
      return ctx.redirect("/" + cv.as_default_by_username)
    }

    const link = config.VITE_API_URL + "/id/" + user_id
    return await render_cv(ctx, cv, { link, auto_print })
  })
  .get("/:username/:cv_name", async (ctx) => {
    const { username } = ctx.req.param()
    const { value: cv_name, auto_print } = parse_pdf(ctx.req.param("cv_name"))
    const happy_path_result = await db._dev_md_cv.findByPrimaryIndex(
      "as_regulary_by_name_username",
      [username, cv_name],
    )

    if (happy_path_result?.value) {
      const cv = happy_path_result.value
      const link = config.VITE_API_URL + "/" + username + "/" + cv_name

      return await render_cv(ctx, cv, { link, auto_print })
    }

    const db_user_res = await users_service.find_by_nik(username)
    const target_user = db_user_res.data

    if (target_user) {
      return ctx.redirect("/" + target_user.nik)
    }

    return ctx.notFound()
  })
  .get("/:username", async (ctx) => {
    const { value: username, auto_print } = parse_pdf(
      ctx.req.param("username"),
    )
    const happy_path_result = await db._dev_md_cv.findByPrimaryIndex(
      "as_default_by_username",
      username,
    )
    const happy = happy_path_result?.value

    if (happy) {
      const link = config.VITE_API_URL + "/" + username
      return await render_cv(ctx, happy, { link, auto_print })
    }

    const db_user_res = await users_service.find_by_nik(username)
    const target_user = db_user_res.data

    if (target_user) {
      const { result: public_not_default_cv_list } = await db._dev_md_cv
        .findBySecondaryIndex(
          "user_id",
          target_user._id,
          {
            filter: ({ value }) => value.is_published,
          },
        )

      if (public_not_default_cv_list.length > 0) {
        const link = config.VITE_API_URL + "/" + target_user.nik!
        return ctx.html(
          <SimpleLayout link={link} print_pdf={false}>
            <p>
              {`This is ${
                target_user.nik || target_user.name
              } dashboard. Navigate to the site by this link:`}
            </p>
            <a href="https://seewe.deno.dev/navigate/to/visit/site">
              <h1>seewe.deno.dev</h1>
            </a>
            <p>Or continue explore profiles:</p>
            <hr />
            <h1>{target_user.nik || target_user.name}</h1>
            <ol>
              {public_not_default_cv_list.map(({ value }, i) => (
                <li key={value._id!}>
                  <a
                    href={config.VITE_API_URL + "/" + target_user.nik! + "/" +
                      (value.name || "")}
                  >
                    <h4>
                      {"CV"} {value.name ||
                        value.as_regulary_by_name_username?.join("/") ||
                        `no. ${value._id!}`}
                    </h4>
                  </a>
                </li>
              ))}
            </ol>
          </SimpleLayout>,
        )
      }
    }

    return ctx.notFound()
  })
  .get("*", serve_static)
