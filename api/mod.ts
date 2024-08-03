import { OpenAPIHono } from "@hono/zod-openapi"
import { cors } from "hono/cors"
import { showRoutes } from "hono/dev"
import { logger } from "hono/logger"
import type { DotenvFile } from "./env.d.ts"
import { openapi_router } from "./routers/openapi/mod.openapi.tsx"
import { spa_subserver } from "./spa_subserver.tsx"
import { load_env } from "./utils/load_env.util.ts"
import { api_v1 } from "./v1.ts"

const config = await load_env<DotenvFile>()
const app = new OpenAPIHono()

app.use(logger()).use(
  cors({
    origin: config.UI_URL!.split(" "),
  }),
)

app.route("/", api_v1)
app.route("/openapi", openapi_router)
app.route("/", spa_subserver)

Deno.serve({ port: 3000 }, app.fetch)

showRoutes(app)
