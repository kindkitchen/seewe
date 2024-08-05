<script setup lang="ts">
import { use_auth } from "@/stores/use_auth.store"
import { use_md } from "@/stores/use_md.store"
import { ref } from "vue"
import { MdEditor } from "md-editor-v3"

const is_mobile = window.innerWidth < 500
const auth = use_auth()
let html = ""
const md = use_md()
const text = ref(md.edited_str)
</script>
<template>
  <MdEditor
    :style="{ height: 'fit-content' }"
    :no-mermaid="true"
    :on-html-changed="
      (html_str: string) => {
        html = html_str
      }
    "
    :toolbars="['pageFullscreen', 'unorderedList', 'title', 'table', 'revoke', 'previewOnly']"
    :preview="!is_mobile"
    v-model="text"
    language="en-US"
    preview-theme="vuepress"
    :no-katex="true"
    :show-toolbar-name="false"
    :showCodeRowNumber="false"
  />
</template>
