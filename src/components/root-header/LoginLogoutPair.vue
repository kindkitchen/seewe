<template>
  <tag-link to="#" @click="post_logout_query" v-if="auth.user" size="sm" :aria-current="undefined"
    >Logout</tag-link
  >
  <LoginWithGoogleBtn v-else @success="post_sign_in" @fail="console.error">
    <tag-link to="#">Login with Google</tag-link>
  </LoginWithGoogleBtn>
</template>

<script setup lang="ts">
import { post_logout_query } from "@/queries/post_logout.query"
import { post_sign_in } from "@/queries/post_sign_in.query"
import { use_auth } from "@/stores/use_auth.store"
import LoginWithGoogleBtn from "../LoginWithGoogleBtn.vue"

const auth = use_auth()
</script>
