import { Context } from "hono"
import { serveDir } from "jsr:@std/http"
import { join } from "jsr:@std/path"

export async function serve_static(ctx: Context) {
  const fsRoot = join(Deno.cwd(), "dist")
  const req = ctx.req.raw
  const url = new URL(req.url)
  let isIndex = url.pathname === "/" || url.pathname === "/index.html"
  let res = await serveDir(req, { fsRoot })

  if (res.status === 404) {
    const index = new URL(req.url)
    index.pathname = "index.html"
    isIndex = true
    res = await serveDir(new Request(index, req), { fsRoot })
  }

  if (isIndex) {
    res.headers.set(
      "cache-control",
      "max-age=0, no-cache, no-store, must-revalidate",
    )
    res.headers.set("pragma", "no-cache")
    res.headers.set("expires", "0")
  }

  return res
}
