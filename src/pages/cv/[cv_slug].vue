<script lang="ts">
import { my_fetch } from "@/my_fetch"
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic"

const load_content = defineBasicLoader("/cv/[cv_slug]", async (to) => {
  const cv_slug = to.params.cv_slug
  const content = await my_fetch({
    method: "get",
    path: "/v1/md-cv/:slug",
    is_public_api: true,
    res_as: "text/plain",
    params: { slug: cv_slug },
  })
  return content
})
</script>

<script lang="ts" setup>
const { data: content } = load_content()
</script>

<template>
  <div>
    <div v-if="content" v-html="content"></div>
  </div>
</template>
