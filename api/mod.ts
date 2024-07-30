import { OpenAPIHono } from "@hono/zod-openapi"
import type { DotenvFile } from "./env.d.ts"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { api_v1 } from "./v1.ts"
import { showRoutes } from "hono/dev"
import { load_env } from "./utils/load_env.util.ts"
import { openapi_router } from "./routers/openapi/mod.openapi.tsx"

const config = await load_env<DotenvFile>()
const app = new OpenAPIHono()

app.use(logger()).use(
  cors({
    origin: config.UI_URL!.split(" "),
  }),
)

app.route("/", api_v1)
app.route("/openapi", openapi_router)

Deno.serve({ port: 3000 }, app.fetch)

showRoutes(app)
