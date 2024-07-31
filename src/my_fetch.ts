import type { v1_ } from "@/types/v1_.namespace"
import { UiException } from "@/utils/ui_exception"
import { use_auth } from "./stores/use_auth.store"
import { stuff } from "./stuff"
import { network_client_state } from "./network_client.state"
import { url_param_replacer } from "./utils/url_param_replacer.util"

export async function my_fetch<M extends v1_.Method, P extends v1_.Path>({
  path,
  params,
  is_public_api,
  method,
  res_as,
  ...rest
}: ApiCallPayload<M, P>): ApiCallRes<M, P> {
  const api_call = async () => {
    const req_init: RequestInit = {
      method,
    }
    if (!is_public_api) {
      if (network_client_state.refresh.status === "none") {
        throw new UiException("login_is_required", "none")
      } else if (network_client_state.refresh.status === "processing") {
        const is_refresh_success = await network_client_state.refresh.result
        if (!is_refresh_success) {
          throw new UiException("login_is_required", "last processing failed")
        }
      }
      const access_token = stuff.get_bearers()?.access_token
      if (!access_token) {
        network_client_state.refresh = { status: "none" }
        throw new UiException("login_is_required", "it looks like logout happen before")
      }
      req_init.headers = {
        authorization: `Bearer ${access_token}`,
      }
    }
    const endpoint = params ? url_param_replacer(path, params as Record<string, string>) : path
    const _rest = rest as Partial<RequestInit>
    req_init.headers = {
      "content-type": "application/json",
      ...req_init.headers,
      ..._rest.headers,
    }
    if (_rest.body) {
      req_init.body = JSON.stringify(_rest.body)
    }
    return fetch(import.meta.env.VITE_API_URL + endpoint, req_init)
  }
  const res = await api_call()
  if (!res.ok) {
    if ([401, 403].includes(res.status) && !is_public_api) {
      if (network_client_state.refresh.status === "ok") {
        network_client_state.refresh = {
          status: "processing",
          result: new Promise((resolve) => {
            const refresh_token = stuff.get_bearers()?.refresh_token

            if (!refresh_token) {
              network_client_state.refresh = { status: "none" }
              throw new UiException("*", "refresh_token is missing???")
            }

            const refresh_api_call = async () => {
              try {
                const refresh_res = await my_fetch({
                  path: "/v1/auth/refresh",
                  method: "post",
                  res_as: "application/json",
                  body: {
                    refresh_token,
                  },
                  is_public_api: true,
                })
                network_client_state.refresh = { status: "ok" }
                use_auth().login(refresh_res)
                resolve(true)
              } catch (err) {
                network_client_state.refresh = { status: "none" }
                use_auth().logout()
                resolve(false)
              }
            }
            refresh_api_call()
          }),
        }
        api_call()
      } else if (network_client_state.refresh.status === "none") {
        throw new UiException("login_is_required", "second none")
      } else if (network_client_state.refresh.status === "processing") {
        if (await network_client_state.refresh.result) {
          api_call()
        }
        throw new UiException("login_is_required", "awaited failed refresh result")
      }
    } else {
      console.error(res.status, res.statusText)
      throw res.json().catch(() => res)
    }
  }

  if (res_as === "none") {
    return undefined as unknown as ApiCallRes<M, P>
  } else if (res_as === "text/plain") {
    return res.text().catch(() => {
      console.error("res.text() failed")
      throw res
    }) as ApiCallRes<M, P>
  }

  return res.json().catch(() => {
    console.error("res.json() failed")
    throw res
  })
}

type ApiCallPayload<M extends v1_.Method, P extends v1_.Path> = v1_.Req<M, P>["headers"] extends
  | undefined
  | never
  ? Omit<v1_.Req<M, P>, "headers"> & { is_public_api: true }
  : Required<Required<v1_.Req<M, P>>["headers"]> extends Omit<
        Record<string, string>,
        "authorization"
      >
    ? v1_.Req<M, P> & { is_public_api: true }
    : Omit<Required<Required<v1_.Req<M, P>>["headers"]>, "authorization"> extends Record<
          string,
          never
        >
      ? Omit<v1_.Req<M, P>, "headers"> & { is_public_api: false }
      : v1_.Req<M, P> & { is_public_api: false }

type ApiCallRes<M extends v1_.Method, P extends v1_.Path> = Promise<
  v1_.Success<M, P, 200> extends Omit<Record<string, unknown>, "ERROR">
    ? v1_.Success<M, P, 200>
    : v1_.Success<M, P, 201>
>
