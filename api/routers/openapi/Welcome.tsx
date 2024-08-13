import { SimpleLayout } from "../../utils/SimpleLayout.tsx"
import type { FC } from "hono/jsx"

export const Welcome: FC = () => {
  return (
    <SimpleLayout>
      <h1>
        Usefull links for development{" "}
        <a href="https://seewe.deno.dev">seewe.deno.dev</a> project
      </h1>
      <hr />
      <ul>
        <li class="p-2 hover:bg-slate-200">
          <a class="block" href="/openapi/v1/doc">
            <pre>/v1 API documentation</pre>
          </a>
        </li>
      </ul>
    </SimpleLayout>
  )
}
