<script setup lang="ts">
import { use_auth } from "@/stores/use_auth.store"
import { use_md } from "@/stores/use_md.store"
import { ref } from "vue"
import { MdEditor } from "md-editor-v3"
import { computed } from "vue"
import { tw } from "@/utils/tw.util"

const is_mobile = window.innerWidth < 500
const auth = use_auth()

/**
 * @name Save/Discard
 */
const md = use_md()
let html_str = ""
const md_str = ref(md.edited_str)
const is_changed = computed(() => md_str.value !== md.edited_str)
const handle_save = () => {
  md.edited_str = md_str.value
}
const handle_discard = () => {
  md_str.value = md.edited_str
}
// ===========================
</script>
<template>
  <div>
    <tag-speed-dial :class="tw('z-10 fixed right-10 top-80')">
      <div class="flex flex-col gap-2">
        <!-- Save/Discard -->
        <div class="flex flex-row flex-nowrap gap-0">
          <tag-button
            size="lg"
            v-show="is_changed"
            class="relative left-6 top-7 mx-0 bg-green-100 text-black"
            @click="handle_save"
            >Save changes</tag-button
          >
          <tag-button
            size="sm"
            v-show="is_changed"
            class="mx-0 bg-yellow-100 text-black"
            @click="handle_discard"
            >Discard</tag-button
          >
        </div>
      </div>
    </tag-speed-dial>
    <MdEditor
      :style="{ height: 'fit-content' }"
      :no-mermaid="true"
      :on-html-changed="
        (html) => {
          html_str = html
        }
      "
      :no-upload-img="true"
      :toolbars="['pageFullscreen', 'unorderedList', 'title', 'previewOnly']"
      :preview="!is_mobile"
      v-model="md_str"
      language="en-US"
      preview-theme="vuepress"
      :no-katex="true"
      :show-toolbar-name="false"
      :showCodeRowNumber="false"
    >
    </MdEditor>
  </div>
</template>
