import { OpenAPIHono } from "@hono/zod-openapi"
import { join } from "@std/path"
import { serveDir } from "jsr:@std/http@^0.224.5"

const fsRoot = join(Deno.cwd(), "dist")
export const spa_subserver = new OpenAPIHono()
  .get("*", async (ctx) => {
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
  })
