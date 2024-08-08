<script setup lang="ts">
import { use_auth } from "@/stores/use_auth.store"
import { use_md } from "@/stores/use_md.store"
import { tw } from "@/utils/tw.util"
import { MdEditor } from "md-editor-v3"
import Button from "primevue/button"
import { useToast } from "primevue/usetoast"
import { ref } from "vue"
import UploadMdCvForm from "../../forms/upload_mdcv/UploadMdCvForm.vue"

const toast = useToast()
const is_mobile = window.innerWidth < 500
const md = use_md()
const auth = use_auth()
const is_upload_form_open = ref(false)
</script>

<template>
  <t-h>Markdown CV</t-h>
  <div :class="tw('flex justify-between sticky top-2 z-10')">
    <Button
      @click="() => (is_upload_form_open = !is_upload_form_open)"
      :size="is_mobile ? 'small' : 'large'"
      icon="pi pi-upload"
      icon-pos="left"
      :label="is_mobile ? undefined : 'Upload changes'"
      :rounded="is_mobile"
    />
  </div>
  <MdEditor
    :style="{ minHeight: '400px', height: 'fit-content' }"
    :no-mermaid="true"
    :on-html-changed="
      (html) => {
        md.html_str = html
      }
    "
    :on-change="
      (md_str) => {
        md.update_str(md_str)
      }
    "
    :no-upload-img="true"
    :toolbars="['pageFullscreen', 'unorderedList', 'title', 'previewOnly']"
    :preview="!is_mobile"
    v-model="md.edited_str"
    language="en-US"
    preview-theme="vuepress"
    :no-katex="true"
    :show-toolbar-name="false"
    :showCodeRowNumber="false"
  >
  </MdEditor>
  <UploadMdCvForm v-model="is_upload_form_open" />
</template>
