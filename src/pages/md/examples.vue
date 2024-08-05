<template>
  <pre v-if="error">{{ error }}</pre>
  <div v-else-if="examples" :class="`grid grid-cols-2 sm:grid-cols-${examples.length}`">
    <div v-for="ex of examples" :key="ex.name" class="h-[600px]">
      <MdPreview
        :model-value="ex.md_str"
        @click="
          () => {
            md.preview_str = ex.md_str
            router.push({ name: '/md/' })
          }
        "
        class="hover:bg-slate-300"
      />
    </div>
  </div>
  <pre class="text-gray-100 text-2xl font-mono" v-else>
    ...loading
  </pre>
</template>

<script setup lang="ts">
const router = useRouter()
const { data: examples, error } = load_examples()
const md = use_md()
</script>

<script lang="ts">
import { my_fetch } from "@/my_fetch"
import { use_md } from "@/stores/use_md.store"
import { MdPreview } from "md-editor-v3"
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic"
import { useRouter } from "vue-router"

const load_examples = defineBasicLoader("/md/examples", async () => {
  const res = await my_fetch({
    path: "/v1/content/md-example",
    method: "get",
    is_public_api: true,
    res_as: "application/json",
  })

  return res.examples
})
</script>
