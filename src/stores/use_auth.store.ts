import { stuff } from "@/stuff"
import { type v1_ } from "@/types/v1_.namespace"
import { defineStore } from "pinia"
import { ref } from "vue"
import { network_client_state } from "@/network_client.state"
import type { user_ } from "@/types/user_namespace"

export const use_auth = defineStore("auth", () => {
  const u = ref<user_.Entity | undefined>(stuff.restore_user())

  return {
    user: u,
    logout() {
      network_client_state.refresh = { status: "none" }
      stuff.update_bearers(null)
      stuff.rewrite_user(null)
      u.value = undefined
    },
    upsert_user(user: user_.Entity) {
      stuff.rewrite_user(user)
      u.value = user
    },
    login(res: v1_.Success<"post", "/v1/auth/sign-in", 200>) {
      const { access_token, refresh_token, token_type: _, ...user } = res
      stuff.update_bearers({ access_token, refresh_token })
      stuff.rewrite_user(user)
      network_client_state.refresh = { status: "ok" }
      u.value = user
    },
  }
})
