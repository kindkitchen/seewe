<script setup lang="ts">
import { FormKit } from "@formkit/vue"
import { useAttrs } from "vue"

const attrs = useAttrs()
</script>

<template>
  <FormKit
    :classes="{
      input: attrs.class as any,
    }"
    type="button"
    ignore
  >
    <slot></slot>
  </FormKit>
</template>
