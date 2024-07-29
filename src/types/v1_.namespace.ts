// deno-lint-ignore-file no-explicit-any no-namespace
import type { paths } from "./api_version_one"

export namespace v1_ {
  export type Path = keyof paths
  export type Method = "get" | "post" | "put" | "delete"
  export type Req<M extends Method, P extends Path> = (paths[P][M] extends infer Operation extends {
    requestBody: {
      content: {
        "application/json": Record<string, unknown>
      }
    }
  }
    ? {
        body: Operation["requestBody"]["content"]["application/json"]
      }
    : {
        body?: never
      }) &
    (paths[P][M] extends infer Operation extends {
      parameters: {
        header?: Record<string, unknown>
      }
    }
      ? {
          headers: Operation["parameters"]["header"]
        }
      : { headers?: never }) &
    (paths[P][M] extends infer Operation extends {
      parameters: {
        path: Record<string, unknown>
      }
    }
      ? {
          params: Operation["parameters"]["path"]
        }
      : { params?: never }) &
    (paths[P][M] extends infer Operation extends {
      parameters: {
        query: Record<string, unknown>
      }
    }
      ? {
          qs: Operation["parameters"]["query"]
        }
      : { qs?: never }) &
    (paths[P][M] extends undefined | never
      ? {
          ERROR: `${M} ${P} DOES NOT EXIST!!!`
          method?: never
          path?: never
        }
      : {
          method: M
          path: P
        }) & {
      method: M
      path: P
    }

  const Pub: v1_.Req<"post", "/v1/auth/refresh"> = {
    method: "post",
    path: "/v1/auth/refresh",
    headers: undefined,
    body: { refresh_token: "ok" },
  }

  const Priv: v1_.Req<"post", "/v1/auth/logout"> = {
    method: "post",
    path: "/v1/auth/logout",
    headers: {},
  }
  export type Success<
    M extends Method,
    P extends Path,
    N extends 200 | 201 | 204,
  > = paths[P][M] extends {
    responses: Record<N, any>
  }
    ? paths[P][M]["responses"][N]["content"]["application/json"]
    : {
        ERROR: `${M} ${P} => RES ${N} DOES NOT EXIST!!!`
      }
  export type Fail<
    M extends Method,
    P extends Path,
    N extends 400 | 401 | 403 | 404 | 400,
  > = paths[P][M] extends {
    responses: Record<N, any>
  }
    ? paths[P][M]["responses"][N]["content"]["application/json"]
    : {
        ERROR: `${M} ${P} => RES ${N} DOES NOT EXIST!!!`
      }
}
