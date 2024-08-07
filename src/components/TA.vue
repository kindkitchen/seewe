<script setup lang="ts">
import type { RouterLinkProps } from "vue-router"

withDefaults(
  defineProps<{
    to?: RouterLinkProps["to"]
  }>(),
  {
    to: "#",
  },
)
</script>

<template>
  <a v-if="typeof to === 'string' && to.startsWith('http')" :href="to" class="my-link">
    <slot></slot>
  </a>
  <router-link v-else :to class="my-link">
    <slot></slot>
  </router-link>
</template>

<style>
.my-link {
  @apply text-nowrap active:bg-gray-800 cursor-pointer block rounded-sm px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white;
}

.link-exact-active,
.link-active {
  @apply bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium;
}
</style>
