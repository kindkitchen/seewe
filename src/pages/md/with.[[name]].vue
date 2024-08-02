<script lang="ts">
import { my_fetch } from "@/my_fetch"
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic"
import { use_md } from "@/stores/use_md.store"

let prev_name = "ryan-dahl"
const get_example_md_content = defineBasicLoader("/md/with.[[name]]", async (to) => {
  const name = to.params.name || prev_name
  prev_name = name
  const example = await my_fetch({
    method: "get",
    path: "/v1/content/md-example/:name",
    res_as: "text/plain",
    is_public_api: true,
    params: { name },
  })

  return example as string
})
</script>

<script setup lang="ts">
import "md-editor-v3/lib/style.css"
// ---
import { MdPreview } from "md-editor-v3"
import { ref, watchEffect } from "vue"

const md = use_md()
const text = ref("")
const { data: example_md, isLoading } = get_example_md_content()
const add_to_editor = () => {
  md.edited_str = text.value
}
const clean_editor = () => {
  md.edited_str = ""
}

watchEffect(() => {
  if (example_md.value) {
    text.value = example_md.value
  }
})
</script>

<template>
  <div class="flex flex-col items-center sm:items-start">
    <tag-link to="/md/editor" @click="clean_editor"> Build CV From Scratch </tag-link>
    <tag-link to="/md/editor" @click="add_to_editor"> Continue To Modfify This </tag-link>
    <tag-link to="/md/examples"> Choose Another Example For Start </tag-link>
  </div>
  <div class="sm:px-[20%]">
    <MdPreview v-show="!isLoading && example_md" :model-value="text" />
  </div>
</template>
