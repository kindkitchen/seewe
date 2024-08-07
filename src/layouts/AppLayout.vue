<script setup lang="ts">
import RootHeader from "./root-header/RootHeader.vue"
</script>
<template>
  <div class="min-h-screen bg-emerald-50">
    <RootHeader />
    <div class="px-1 sm:px-[25%]">
      <slot></slot>
    </div>
  </div>
</template>
