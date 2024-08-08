<script setup lang="ts">
import Button from "primevue/button"
import UploadMdCvForm from "../forms/UploadMdCvForm.vue"
import { ref } from "vue"
import BlurGuardCmp from "@/components/BlurGuardCmp.vue"
import { FormKit } from "@formkit/vue"

const is_open = ref(false)
</script>

<template>
  <UploadMdCvForm v-model="is_open" />
  <t-btn @click="is_open = true">Open modal</t-btn>
  <BlurGuardCmp :model-value="is_open">
    <FormKit type="form" @submit="() => console.log">
      <FormKit type="text" label="Only for authorized"></FormKit>
    </FormKit>
  </BlurGuardCmp>
</template>
