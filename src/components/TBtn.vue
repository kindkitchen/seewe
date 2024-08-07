<script setup lang="ts">
import { FormKit } from "@formkit/vue"
</script>

<template>
  <FormKit
    type="button"
    ignore
    :classes="{
      input: 'active:border-transparent py-[4px] text-nowrap',
    }"
  >
    <slot></slot>
  </FormKit>
</template>
