// deno-lint-ignore-file no-explicit-any no-namespace
import type { paths } from "./api_version_one"

export namespace v1_ {
  export type Path = keyof paths
  export type Method = "get" | "post" | "put" | "delete"
  export type Req<M extends Method, P extends Path> = (paths[P][M] extends infer Res200 extends {
    responses: Record<
      200,
      {
        content: Record<string, unknown>
      }
    >
  }
    ? {
        res_as: keyof Res200["responses"][200]["content"]
      }
    : paths[P][M] extends infer Res201 extends {
          responses: Record<
            201,
            {
              content: Record<string, unknown>
            }
          >
        }
      ? {
          res_as: keyof Res201["responses"][201]["content"]
        }
      : paths[P][M] extends infer Res204 extends {
            responses: Record<
              204,
              {
                content: Record<string, unknown>
              }
            >
          }
        ? {
            res_as: keyof Res204["responses"][204]["content"]
          }
        : {
            res_as: "none"
          }) &
    (paths[P][M] extends infer Operation extends {
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
    body: { refresh_token: "ok" },
    headers: undefined,
    res_as: "application/json",
  }

  const Priv: v1_.Req<"post", "/v1/auth/logout"> = {
    method: "post",
    path: "/v1/auth/logout",
    headers: {},
    res_as: "none",
  }
  Pub
  Priv
  export type Success<
    M extends Method,
    P extends Path,
    N extends 200 | 201 | 204,
  > = paths[P][M] extends {
    responses: Record<N, any>
  }
    ? paths[P][M]["responses"][N]["content"]["application/json"]
    : unknown
  export type Fail<
    M extends Method,
    P extends Path,
    N extends 400 | 401 | 403 | 404 | 400,
  > = paths[P][M] extends {
    responses: Record<N, any>
  }
    ? paths[P][M]["responses"][N]["content"]["application/json"]
    : unknown
}
