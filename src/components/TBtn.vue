<script setup lang="ts">
import { FormKit } from "@formkit/vue"
</script>

<template>
  <FormKit
    type="button"
    ignore
    :classes="{
      input: 'active:border-transparent',
    }"
  >
    <slot></slot>
  </FormKit>
</template>
