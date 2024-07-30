<script setup lang="ts">
import RootHeader from "@/components/RootHeader.vue"
</script>
<template>
  <div class="min-h-screen root">
    <RootHeader> </RootHeader>
    <slot></slot>
  </div>
</template>

<style scoped>
.root {
  background: rgb(31, 41, 55);
}
</style>
