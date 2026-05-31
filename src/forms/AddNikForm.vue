<script setup lang="ts">
import { post_add_nik } from "@/queries/post_add_nik.query";
import { put_update_nik } from "@/queries/put_update_nik.query";
import { use_auth } from "@/stores/use_auth.store";
import type { FormKitNode } from "@formkit/core";
import { FormKit, setErrors } from "@formkit/vue";
import { useToast } from "primevue/usetoast";

const emit = defineEmits<{
  on_success: [nik: string];
  on_fail: [error: unknown];
}>();

const { add } = useToast();
const auth = use_auth();
const handle_submit_add_nik = async (
  { nik }: { nik: string },
  node: FormKitNode,
) => {
  try {
    if (auth.user?.nik) {
      await put_update_nik(nik);
    } else {
      await post_add_nik(nik);
    }
    add({
      severity: "success",
      detail: `Hi there! ${nik}!`,
      summary: "Cool!",
      life: 2000,
    });
    emit("on_success", nik);
  } catch (err: any) {
    console.error(err);
    setErrors("settings::add_nik", err);
    add({
      severity: "warn",
      summary: "Unable to set username",
      detail: "See error messages",
      life: 2000,
    });
    emit("on_fail", err);
  }
};
</script>

<template>
  <FormKit
    id="settings::add_nik"
    type="form"
    :submit-label='auth.user?.nik ? "Update username" : "Set username"'
    @submit="handle_submit_add_nik"
  >
    <FormKit
      type="text"
      name="nik"
      label="Username"
      :value="auth.user?.nik"
      validation="required|length:3,32|matches:/^[\w-]+$/"
      :validation-messages='{
        matches: "Only letters, numbers, _ and - are allowed.",
      }'
      help="3–32 chars. Used in your public links, e.g. /your-name."
    />
  </FormKit>
</template>
