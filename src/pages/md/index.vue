<script setup lang="ts">
import "md-editor-v3/lib/style.css"
// ---
import { use_md } from "@/stores/use_md.store"
import { MdPreview } from "md-editor-v3"
import { ref } from "vue"

const md = use_md()
const text = ref(md.preview_str)
</script>
<template>
  <div class="flex flex-col items-center sm:items-start">
    <tag-link v-if="md.edited_str.length > 0" to="/md/editor"> Back To My Last Edited CV</tag-link>
    <tag-link to="/md/editor" @click="() => md.update_str(text)">
      Continue Modify This CV
    </tag-link>
    <tag-link to="/md/examples"> See More Templates </tag-link>
  </div>
  <div class="sm:px-[20%]">
    <MdPreview :model-value="text" />
  </div>
</template>
