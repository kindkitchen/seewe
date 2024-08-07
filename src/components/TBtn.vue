<script setup lang="ts">
import { FormKit } from "@formkit/vue"
</script>

<template>
  <FormKit type="button" ignore :classes="{}">
    <slot></slot>
  </FormKit>
</template>
