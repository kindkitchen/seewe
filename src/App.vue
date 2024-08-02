<script setup lang="ts">
import "md-editor-v3/lib/style.css"
// ---
import { RouterView } from "vue-router"
import RootLayout from "./layouts/RootLayout.vue"
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <component v-if="route.name === '/cv/[cv_slug]'" :is="Component" />
    <RootLayout v-else>
      <component :is="Component" />
    </RootLayout>
  </RouterView>
</template>
