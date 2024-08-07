<script setup lang="ts">
withDefaults(
  defineProps<{
    n?: 1 | 2 | 4
  }>(),
  {
    n: 4,
  },
)
</script>

<template>
  <h4 v-if="n === 4">
    <slot></slot>
  </h4>
  <h2 v-else-if="n === 2">
    <slot></slot>
  </h2>
  <h1 v-else>
    <slot></slot>
  </h1>
</template>
