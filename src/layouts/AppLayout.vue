<script setup lang="ts">
import RootHeader from "./root-header/RootHeader.vue"
import Toast from "primevue/toast"
</script>
<template>
  <div class="min-h-screen bg-emerald-50 sm:px-[20%] [&>*]:p-1">
    <RootHeader />
    <slot></slot>
    <Toast />
  </div>
</template>
