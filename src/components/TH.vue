<script setup lang="ts">
withDefaults(
  defineProps<{
    n?: 1 | 2 | 3 | 4 | 5 | 6;
  }>(),
  {
    n: 4,
  },
);
</script>

<template>
  <h4 class="text-3xl my-t-h" v-if="n === 4">
    <slot></slot>
  </h4>
  <h3 class="text-4xl my-t-h" v-else-if="n === 3">
    <slot></slot>
  </h3>
  <h2 class="text-5xl my-t-h" v-else-if="n === 2">
    <slot></slot>
  </h2>
  <h5 class="text-2xl my-t-h" v-else-if="n === 5">
    <slot></slot>
  </h5>
  <h6 class="text-xl my-t-h" v-else-if="n === 6">
    <slot></slot>
  </h6>
  <h1 class="text-6xl my-t-h" v-else>
    <slot></slot>
  </h1>
</template>

<style>
.my-t-h {
  @apply text-emerald-900 to-white font-normal leading-normal mt-0 mb-2;
}
</style>
