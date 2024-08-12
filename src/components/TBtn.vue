<script setup lang="ts">
import { FormKit } from "@formkit/vue"
import { useAttrs } from "vue"
import { tw } from "@/utils/tw.util"

const attrs = useAttrs()
</script>

<template>
  <FormKit
    :classes="{
      input: tw(attrs.class as any),
    }"
    type="button"
    ignore
  >
    <slot></slot>
  </FormKit>
</template>
