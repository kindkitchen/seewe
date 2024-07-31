import { my_fetch } from "@/my_fetch"

export const get_hello_world_query = async (
  dev: {
    set_timeout?: number
    err?: unknown
  } = {},
) => {
  if (dev.set_timeout) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, dev.set_timeout)
    })
  }

  if (dev.err) {
    throw dev.err
  }

  return my_fetch({
    path: "/v1/hello-world",
    method: "get",
    res_as: "text/html",
    is_public_api: true,
  })
}
