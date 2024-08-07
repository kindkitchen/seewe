<script setup lang="ts">
import LoginWithGoogleBtn from "@/components/LoginWithGoogleBtn.vue"
import { my_fetch } from "@/my_fetch"
import { ref } from "vue"
import type { ImplicitFlowSuccessResponse } from "vue3-google-signin"
const dev = ref("")
const handle_success_google_sign_in = async (res: ImplicitFlowSuccessResponse) => {
  const server_res = await my_fetch({
    method: "post",
    path: "/v1/auth/sign-in",
    is_public_api: true,
    body: {
      auth_provider: "google",
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      code: res.code,
    },
    res_as: "application/json",
  })

  dev.value = JSON.stringify(server_res)
}
</script>

<template>
  <t-h>Home</t-h>
</template>
