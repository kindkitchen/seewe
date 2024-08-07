import { createRoute, OpenAPIHono } from "@hono/zod-openapi"
import { z } from "zod"
import { DotenvFile } from "../../env.d.ts"
import { load_env } from "../../utils/load_env.util.ts"

const config = await load_env<DotenvFile>()

export const example_names = [
  "ryan-dahl",
  "evan-you",
  "gvido-van-rossum",
  "linus-torwalds",
  "david-khourshid",
]

export const get_md_example_route = createRoute({
  path: "/md-example/:name",
  method: "get",
  request: {
    params: z.object({
      "name": z.string(),
    }),
  },
  responses: {
    200: {
      description: "Return markdown string of example CV for some cool person",
      content: {
        "text/plain": {
          schema: {},
        },
      },
    },
  },
})

export const get_md_examples_list_route = createRoute({
  method: "get",
  path: "/md-example",
  request: {},
  responses: {
    200: {
      description: "Return list of example CVs",
      content: {
        "application/json": {
          schema: z.object({
            examples: z.array(z.object({
              name: z.string(),
              md_str: z.string(),
            })),
          }),
        },
      },
    },
  },
})

export const content_router = new OpenAPIHono().openapi(
  get_md_example_route,
  async (ctx) => {
    const { name } = ctx.req.valid("param")
    const example = await get_example_str(name)()

    return ctx.text(example.default)
  },
).openapi(get_md_examples_list_route, async (ctx) => {
  const examples = await Promise.all(
    example_names.map((name) =>
      get_example_str(name)().then((ex) => ({ md_str: ex.default, name }))
    ),
  )

  return ctx.json({
    examples,
  })
})

export function get_example_str(name: string) {
  const target = example_names.find((n) => n === name)

  if (target) {
    return () => import(`./${target}.ts`) as Promise<{ default: string }>
  } else {
    return () =>
      Promise.resolve({
        default: `
# Unknown Name
_...interesting_
### The Name "${name}" is not listed in our examples

but try the default one with __[\`Ryan Dahl\`](${
          config.UI_URL.split(" ").at(0)
        }/md/with/ryan-dahl)__
* but as you can see
* the full simple but incredible power of __markdown__
* is ready to serve you

> _Write your CV and get the job of your dream!_
`,
      })
  }
}
