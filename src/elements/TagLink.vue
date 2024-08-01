<script setup lang="ts">
import type { RouterLinkProps } from "vue-router"

defineProps<{
  to: RouterLinkProps["to"]
}>()
</script>

<template>
  <router-link
    :to
    class="block rounded-sm px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
  >
    <slot></slot>
  </router-link>
</template>
