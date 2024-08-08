<script setup lang="ts">
import BlurGuardCmp from "@/components/BlurGuardCmp.vue"
import ModalCmp from "@/components/ModalCmp.vue"
import AddNikForm from "@/forms/AddNikForm.vue"
import { use_auth } from "@/stores/use_auth.store"
import { tw } from "@/utils/tw.util"
import { FormKit } from "@formkit/vue"
import { computed, ref } from "vue"

const auth = use_auth()
const is_user = computed(() => !!auth.user)
const is_user_with_nik = computed(() => !!auth.user?.nik)
const show_add_username_form = ref(false)
</script>

<template>
  <div class="flex flex-col">
    <FormKit type="form" @submit="console.log">
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
        <FormKit type="text" label="CV name" name="cv-name" />
      </BlurGuardCmp>
      <FormKit type="checkbox" name="publish" label="Make link with this CV public"></FormKit>
    </FormKit>
  </div>
</template>
