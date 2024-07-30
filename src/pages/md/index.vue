<script setup>
import "md-editor-v3/lib/style.css"
// ---
import { useResizeObserver } from "@vueuse/core"
import { MdEditor, MdPreview } from "md-editor-v3"
import { ref } from "vue"

const root_el = ref()
const is_mobile = ref(window.innerWidth < 500)
useResizeObserver(root_el, ([root]) => {
  const { width, height } = root.contentRect
  console.log(width)
  is_mobile.value = width < 500
})
const text = ref(
  "## Update Me\n---\nedit text below\n#### Contacts:\n* [Link to share this CV]()\n* your@email.com\n* ...\n### Complete it!",
)
</script>

<template>
  <div ref="root_el">
    <MdPreview v-if="is_mobile" :model-value="text" />
    <MdEditor
      :preview="!is_mobile"
      v-model="text"
      language="en-US"
      preview-theme="vuepress"
      no-mermaid
      no-katex
      :show-toolbar-name="false"
      :showCodeRowNumber="false"
    />
  </div>
</template>
