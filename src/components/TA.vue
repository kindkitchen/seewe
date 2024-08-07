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
}
</style>
