<script setup lang="ts">
import "md-editor-v3/lib/style.css"
// ---
import { use_md } from "@/stores/use_md.store"
import { MdEditor, MdPreview } from "md-editor-v3"
import { ref } from "vue"

const is_mobile = window.innerWidth < 500
const md = use_md()
const text = ref(md.edited_str)
</script>

<template>
  <div>
    <MdPreview v-if="is_mobile" :model-value="text" />
    <MdEditor :preview="!is_mobile" v-model="text" language="en-US" />
  </div>
</template>
