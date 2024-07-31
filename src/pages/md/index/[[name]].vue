<script lang="ts">
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic"
import { my_fetch } from "@/my_fetch"

const get_example_md_content = defineBasicLoader("/md//[[name]]", async (to) => {
  const example = await my_fetch({
    method: "get",
    path: "/v1/content/md-example/:name",
    res_as: "text/plain",
    is_public_api: true,
    params: { name: to.params.name || "ryan-dahl" },
  })

  return example as string
})
</script>

<script setup lang="ts">
import "md-editor-v3/lib/style.css"
// ---
import { ref, watchEffect } from "vue"
import { MdEditor, MdPreview } from "md-editor-v3"

const is_mobile = window.innerWidth < 500
const text = ref("")
const { data, isLoading } = get_example_md_content()
const example_md = data

watchEffect(() => {
  if (data.value) {
    text.value = example_md.value
  }
})
</script>

<template>
  <div ref="root_el">
    <tag-h>Update this CV with your info!</tag-h>
    <router-link to="/md/examples"><tag-h size="sm">See more examples</tag-h></router-link>
    <MdPreview v-show="!isLoading && example_md" v-if="is_mobile" :model-value="text" />
    <MdEditor
      v-show="!isLoading && example_md"
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
