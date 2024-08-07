<script setup lang="ts">
import { post_add_nik } from "@/queries/post_add_nik.query"
import { FormKit } from "@formkit/vue"

const handle_submit = async ({ nik }: { nik: string }) => {
  await post_add_nik(nik)
}
</script>
<template>
  <t-h>Settings</t-h>
  <FormKit type="form" @submit="handle_submit">
    <FormKit type="text" name="nik"></FormKit>
  </FormKit>
</template>
