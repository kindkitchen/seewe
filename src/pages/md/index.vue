<script setup>
import { ref } from "vue"
import { MdEditor } from "md-editor-v3"
import "md-editor-v3/lib/style.css"

const text = ref(
  "### Your Name\n---\nprofessional\n#### Contacts:\n* [Link to share this CV]()\n* your@email.com\n* ...\n### Complete it!",
)
</script>

<template>
  <h1>Your CV is waiting on You!</h1>
  <div class="h-full py-4 sm:p-4">
    <MdEditor
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
