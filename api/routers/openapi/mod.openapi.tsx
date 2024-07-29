import { SwaggerUI } from "@hono/swagger-ui"
import type { EnvFile } from "../../../env.d.ts"
import { Hono } from "hono"
import { Welcome } from "./Welcome.tsx"
import { load_env } from "../../utils/load_env.util.ts"

const config = await load_env<EnvFile>({ envFolderPathRelatedToDenoCwd: ".." })

export const openapi_router = new Hono()

openapi_router.get("/", (c) => {
  return c.html(<Welcome />)
})

openapi_router.get("/v1/doc", (ctx) => {
  return ctx.html(
    <>
      <button>
        <a
          href={`https://cv-builder-swagger-helper.deno.dev/?clientId=${config.VITE_GOOGLE_CLIENT_ID}`}
        >
          Sign-in with google
        </a>
      </button>
      <div
        dangerouslySetInnerHTML={{
          __html: SwaggerUI({
            url: "/v1/json",
          }),
        }}
      />
    </>,
  )
})
