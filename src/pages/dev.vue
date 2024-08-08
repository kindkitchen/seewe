<script setup lang="ts">
import Button from "primevue/button"
import UploadSettingsModalForm from "./md-cv/UploadSettingsModalForm.vue"
import { ref } from "vue"

const is_open = ref(false)
</script>

<template>
  <UploadSettingsModalForm v-model="is_open" />
  <Button @click="is_open = true" label="Open modal" />
</template>
