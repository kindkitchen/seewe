import { my_fetch } from "@/my_fetch"
import { use_auth } from "@/stores/use_auth.store"
import type { ImplicitFlowSuccessResponse } from "vue3-google-signin"

export const post_sign_in = async (gres: ImplicitFlowSuccessResponse) => {
  const res = await my_fetch({
    method: "post",
    path: "/v1/auth/sign-in",
    res_as: "application/json",
    body: {
      auth_provider: "google",
      code: gres.code,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    },
    is_public_api: true,
  })
  use_auth().login(res)
}
