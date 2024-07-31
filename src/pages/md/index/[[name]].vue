<script lang="ts">
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic"
import { my_fetch } from "@/my_fetch"
import { watchOnce } from '@vueuse/core'

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

const text = ref("")
const { data: example_md, isLoading } = get_example_md_content()

watchOnce(example_md, () => {
  if (example_md.value) {
    text.value = example_md.value
  }
})
</script>

<template>
  <div ref="root_el">
    <router-link to="/md/editor">
      <tag-button>Build CV From Scratch</tag-button>
    </router-link>
    <router-link to="/md/editor">
      <tag-button>Continue To Modfify This</tag-button>
    </router-link>
    <router-link to="/md/examples">
      <tag-button>Choose Another Example For Start</tag-button>
    </router-link>
    <MdPreview v-show="!isLoading && example_md" :model-value="text" />
  </div>
</template>
