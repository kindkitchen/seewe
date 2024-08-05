<script setup lang="ts">
import "md-editor-v3/lib/style.css"
// ---
import { RouterView } from "vue-router"
import RootLayout from "./layouts/RootLayout.vue"
</script>

<template>
  <RootLayout>
    <RouterView />
  </RootLayout>
</template>
