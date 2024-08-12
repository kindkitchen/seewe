<script lang="ts" setup>
import { onUnmounted, ref } from "vue"
import MdCvsList from "./MdCvsList.vue"

const loading_dots_count = ref(0)
const loading = setInterval(() => {
  loading_dots_count.value = (loading_dots_count.value + 1) % 7
}, 200)
const stop_loading = () => clearInterval(loading)
onUnmounted(stop_loading)
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard</p>
  </div>
  <Suspense :on-resolve="stop_loading">
    <template #fallback>loading...</template>
    <MdCvsList />
  </Suspense>
</template>
