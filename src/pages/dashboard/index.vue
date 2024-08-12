<script lang="ts" setup>
import { onUnmounted, ref } from "vue"
import MdCvsList from "./MdCvsList.vue"
import { use_auth } from "@/stores/use_auth.store";

const loading_dots_count = ref(0)
const auth = use_auth()
const loading = setInterval(() => {
  loading_dots_count.value = (loading_dots_count.value + 1) % 16
}, 50)
const stop_loading = () => clearInterval(loading)
onUnmounted(stop_loading)
</script>

<template>
  <div>
    <t-h :n="1">Your Dashboard</t-h>
  </div>
  <Suspense :on-resolve="stop_loading">
    <template #fallback>
      <t-h> {{ "loading" + ".".repeat(loading_dots_count) }}</t-h></template>
    <MdCvsList />
  </Suspense>
  <div class="text-emerald-700 italic">
    <p>You are logged as {{ auth.user?.name }}</p>
    <p>{{ auth.user?.email }}</p>
  </div>
</template>
