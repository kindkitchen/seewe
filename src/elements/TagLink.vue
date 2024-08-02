<script setup lang="ts">
import type { RouterLinkProps } from "vue-router"

defineProps<{
  to: RouterLinkProps["to"]
}>()
</script>

<template>
  <a v-if="to === '#' || (typeof to === 'string' && to.startsWith('http'))" class="my-link">
    <slot></slot>
  </a>
  <router-link v-else aria-current="page" :to class="my-link">
    <slot></slot>
  </router-link>
</template>
