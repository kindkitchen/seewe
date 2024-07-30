<script setup>
import "md-editor-v3/lib/style.css"
// ---
import { ref } from "vue"
import { MdEditor, MdPreview } from "md-editor-v3"

const is_mobile = window.innerWidth < 500
const text = ref(
  "## Update Me\n---\nedit text below\n#### Contacts:\n* [Link to share this CV]()\n* your@email.com\n* ...\n### Complete it!",
)
</script>

<template>
  <div ref="root_el">
    <MdPreview v-if="is_mobile" :model-value="text" />
    <MdEditor
      v-bind="{ preview }"
      :toolbars="['pageFullscreen', 'unorderedList', 'title', 'table', 'revoke', 'previewOnly']"
      :preview="!is_mobile"
      v-model="text"
      language="en-US"
      preview-theme="vuepress"
      no-mermaid
      no-katex
      :show-toolbar-name="false"
      :showCodeRowNumber="false"
    >
    </MdEditor>
  </div>
</template>
