import { OpenAPIHono } from "@hono/zod-openapi"
import type { DotenvFile } from "./env.d.ts"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { api_v1 } from "./v1.ts"
import { showRoutes } from "hono/dev"
import { load_env } from "./utils/load_env.util.ts"
import { openapi_router } from "./routers/openapi/mod.openapi.tsx"
import { serveDir } from "jsr:@std/http@^0.224.5"

const config = await load_env<DotenvFile>()
const app = new OpenAPIHono()

app.use(logger()).use(
  cors({
    origin: config.UI_URL!.split(" "),
  }),
)

app.route("/", api_v1)
app.route("/openapi", openapi_router)
/**
 * @description
 * UI serving goes below
 */
app.get("/*", async (ctx) => {
  const req = ctx.req.raw
  const url = new URL(req.url)
  let isIndex = url.pathname === "/" || url.pathname === "/index.html"

  let res = await serveDir(req, { fsRoot: "./dist" })

  if (res.status == 404) {
    const index = new URL(req.url)
    index.pathname = "index.html"
    isIndex = true
    res = await serveDir(new Request(index, req))
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

Deno.serve({ port: 3000 }, app.fetch)

showRoutes(app)
