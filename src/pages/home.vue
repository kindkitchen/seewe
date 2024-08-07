<script setup lang="ts">
import LoginWithGoogleBtn from "@/components/LoginWithGoogleBtn.vue"
import { ref } from "vue"
const dev = ref("")
</script>

<template>
  <LoginWithGoogleBtn @success="(res) => (dev = JSON.stringify(res))" />
  <pre>{{ dev }}</pre>
</template>
