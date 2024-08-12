<script lang="ts" setup>
import MdCvsList from "./MdCvsList.vue"
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard</p>
  </div>
  <Suspense>
    <template #fallback>loading...</template>
    <MdCvsList />
  </Suspense>
</template>
