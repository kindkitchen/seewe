<script setup lang="ts">
import { post_add_nik } from "@/queries/post_add_nik.query"
import { FormKit, setErrors } from "@formkit/vue"
import type { FormKitNode } from "@formkit/core"
import { ZodError } from "zod"
import { use_auth } from "@/stores/use_auth.store";

const handle_submit = async ({ nik }: { nik: string }, node: FormKitNode) => {
  try {
    await post_add_nik(nik)
  } catch (err: any) {
    console.log(err)
    setErrors("settings::add_nik", err)
  }
}
const auth = use_auth()
</script>
<template>
  <t-h>Settings</t-h>
  <FormKit id="settings::add_nik" type="form" @submit="handle_submit">
    <FormKit type="text" name="nik" :value="auth.user?.nik" />
  </FormKit>
</template>
