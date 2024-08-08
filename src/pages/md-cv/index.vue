<script setup lang="ts">
import { use_auth } from "@/stores/use_auth.store"
import { use_md } from "@/stores/use_md.store"
import { MdEditor } from "md-editor-v3"
import { computed, ref } from "vue"
import SpeedDial from "primevue/speeddial"
import { useToast } from "primevue/usetoast"

const toast = useToast()

const is_mobile = window.innerWidth < 500
const md = use_md()
const auth = use_auth()
let html_str = ""
const md_str = ref(md.edited_str)
const is_changed = computed(() => md_str.value !== md.edited_str)
const handle_save = () => {
  md.edited_str = md_str.value
}
const handle_discard = () => {
  md_str.value = md.edited_str
}
const items = ref([
  {
    label: "Add",
    icon: "pi pi-pencil",
    command: () => {
      toast.add({ severity: "secondary", summary: "Add", detail: "Data Added", life: 3000 })
    },
  },
  {
    label: "Update",
    icon: "pi pi-refresh",
    command: () => {
      toast.add({ severity: "secondary", summary: "Update", detail: "Data Updated", life: 3000 })
    },
  },
  {
    label: "Delete",
    icon: "pi pi-trash",
    command: () => {
      toast.add({ severity: "secondary", summary: "Delete", detail: "Data Deleted", life: 3000 })
    },
  },
  {
    label: "Upload",
    icon: "pi pi-upload",
    command: () => {
      toast.add({ severity: "secondary", summary: "Delete", detail: "Data Deleted", life: 3000 })
    },
  },
  {
    label: "Vue Website",
    icon: "pi pi-external-link",
    command: () => {
      window.location.href = "https://vuejs.org/"
    },
  },
])
</script>

<template>
  <t-h>Markdown CV</t-h>
  <SpeedDial
    type="semi-circle"
    :radius="80"
    :model="items"
    direction="left"
    mask
    style="position: fixed; top: calc(80% - 2rem); right: 1rem"
  />
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
</template>

<style>
.p-speeddial {
  @apply z-20;
}

.p-speeddial-mask {
  @apply z-10;
}
</style>
