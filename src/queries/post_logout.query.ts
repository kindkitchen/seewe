import { my_fetch } from "@/my_fetch"
import { use_auth } from "@/stores/use_auth.store"
import { UiException } from "@/utils/ui_exception"

export const post_logout_query = async () => {
  const auth = use_auth()

  try {
    const res = await my_fetch({
      method: "post",
      path: "/v1/auth/logout",
      res_as: "none",
      is_public_api: false,
    })
    auth.logout()
    return res
  } catch (err) {
    auth.logout()
    throw new UiException("*", "logout", err)
  }
}
