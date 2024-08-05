<script setup lang="ts">
import "md-editor-v3/lib/style.css"
// ---
import { use_md } from "@/stores/use_md.store"
import { MdPreview } from "md-editor-v3"

const md = use_md()
</script>
<template>
  <div class="flex flex-col items-center sm:items-start">
    <tag-link v-if="md.edited_str.length > 0" to="/md/editor"> Back to last edited CV</tag-link>
    <tag-link v-if="md.preview_str" to="/md/editor" @click="() => md.update_str(md.preview_str)">
      Continue modify this CV
    </tag-link>
    <tag-link to="/md/examples"> See More Templates </tag-link>
    <tag-link @click="() => md.update_str('')" to="/md/editor">
      Start build your CV from scratch</tag-link
    >
  </div>
  <div class="sm:px-[20%]">
    <MdPreview v-if="md.preview_str" :model-value="md.preview_str" />
  </div>
</template>
