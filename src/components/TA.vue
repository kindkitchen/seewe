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
  <a v-if="typeof to === 'string' && to.startsWith('http')" :href="to" class="block">
    <t-btn>
      <slot></slot>
    </t-btn>
  </a>
  <router-link v-else :to>
    <t-btn>
      <slot></slot>
    </t-btn>
  </router-link>
</template>

<style>
.link-exact-active {
  @apply [&_button]:bg-emerald-200 hover:[&_button]:bg-emerald-200 [&_button]:text-emerald-600;
}
</style>
