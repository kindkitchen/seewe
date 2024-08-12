<script setup lang="ts">
import BlurGuardCmp from "@/components/BlurGuardCmp.vue"
import ModalCmp from "@/components/ModalCmp.vue"
import AddNikForm from "@/forms/AddNikForm.vue"
import { post_mdcv_query } from "@/queries/post_mdcv.query"
import { use_auth } from "@/stores/use_auth.store"
import { use_md } from "@/stores/use_md.store"
import type { v1_ } from "@/types/v1_.namespace"
import { tw } from "@/utils/tw.util"
import { FormKit, setErrors } from "@formkit/vue"
import { useToast } from "primevue/usetoast"
import { computed, ref } from "vue"

const auth = use_auth()
const md = use_md()
const { add } = useToast()
const is_user = computed(() => !!auth.user)
const is_user_with_nik = computed(() => !!auth.user?.nik)
const show_add_username_form = ref(false)
const handle_submit = async (data: v1_.Req<"post", "/v1/mdcv">["body"]) => {
  try {
    const res = await post_mdcv_query(data)
    md.edited_mdcv_id = res._id
  } catch (err) {
    console.error(err)
    setErrors("upload-mdcv-form", String(err))
    add({ severity: "error", summary: "Uploading failed", detail: "Check error messages" })
  }
}
</script>

<template>
  <div class="flex flex-col">
    <FormKit type="form" id="upload-mdcv-form" @submit="handle_submit">
      <p v-show="is_user_with_nik" class="italic text-sm">
        Unfortunatelly you haven't define username for your account. That's why the CV naming option
        is not available for you. Your CV link will have auto-generated id.
      </p>
      <BlurGuardCmp :model-value="!is_user_with_nik" :relative_tw="tw('bottom-10 left-20')">
        <template #guard>
          <t-btn v-show="!show_add_username_form" @click="() => (show_add_username_form = true)"
            >Add username now!</t-btn
          >
        </template>
        <ModalCmp v-model="show_add_username_form">
          <template #icon><span></span></template>
          <template #message><span></span> </template>
          <template #buttons>
            <div class="flex flex-col">
              <AddNikForm @on_success="() => (show_add_username_form = false)" />
              <t-btn @click="() => (show_add_username_form = false)">Cancel</t-btn>
            </div>
          </template>
        </ModalCmp>
        <FormKit type="text" label="CV name" name="name" />
      </BlurGuardCmp>
      <FormKit type="hidden" name="md" :value="md.edited_str" />
      <FormKit type="hidden" name="html" :value="md.html_str" />
      <FormKit
        type="checkbox"
        name="is_published"
        label="Make link with this CV public"
        :value="true"
      ></FormKit>
      <FormKit
        type="checkbox"
        name="make_default"
        :disabled="!is_user_with_nik"
        label="Make this CV default"
        :value="!is_user_with_nik"
      ></FormKit>
    </FormKit>
  </div>
</template>
