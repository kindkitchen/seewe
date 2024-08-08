<script setup lang="ts">
import { use_auth } from "@/stores/use_auth.store"
import { use_md } from "@/stores/use_md.store"
import { MdEditor } from "md-editor-v3"
import Button from "primevue/button"
import SpeedDial from "primevue/speeddial"
import { useToast } from "primevue/usetoast"
import { ref, watchEffect } from "vue"

const toast = useToast()
const is_mobile = window.innerWidth < 500
const md = use_md()
const auth = use_auth()
let html_str = ""
const md_str = ref(md.edited_str)
watchEffect(() => {
  md.update_str(md_str.value)
})
const items = ref([
  {
    label: "Upload changes",
    icon: "pi pi-upload",
    command: () => {
      toast.add({
        severity: "success",
        summary: "Uploaded",
        detail: "See by this link!",
        life: 3000,
      })
    },
  },
  {
    label: "Add name",
    icon: "pi pi-wrench",
    command: () => {
      toast.add({ severity: "info", summary: "Added", detail: "Name added!", life: 3000 })
    },
  },
])
</script>

<template>
  <t-h>Markdown CV</t-h>
  <div v-if="!is_mobile" class="flex justify-between sticky top-2 z-10">
    <Button
      size="small"
      v-for="item of items"
      :key="item.label"
      :icon="item.icon"
      icon-pos="left"
      :label="item.label"
      :pt:button.primary.background="'red'"
    />
  </div>
  <MdEditor
    :style="{ height: 'fit-content' }"
    :no-mermaid="true"
    :on-html-changed="
      (html) => {
        html_str = html
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
  <SpeedDial
    v-if="is_mobile"
    type="semi-circle"
    :radius="60"
    :model="items"
    direction="left"
    style="position: fixed; top: calc(80% - 2rem); right: 1rem"
  />
</template>
