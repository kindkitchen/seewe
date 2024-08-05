<script setup lang="ts">
import LoginWithGoogleBtn from "@/components/LoginWithGoogleBtn.vue"
import ModalWindow from "@/components/modal-window/ModalWindow.vue"
import { my_fetch } from "@/my_fetch"
import { post_sign_in } from "@/queries/post_sign_in.query"
import { use_auth } from "@/stores/use_auth.store"
import { use_md } from "@/stores/use_md.store"
import { MdEditor } from "md-editor-v3"
import { ref, watchEffect } from "vue"

const auth = use_auth()
const is_mobile = window.innerWidth < 500
const md = use_md()
const text = ref(md.edited_str)
const html = ref("")
const name = ref<string | undefined>(auth.user?.nik ? "" : undefined)
const handle_publish = async () => {
  const res = await my_fetch({
    method: "post",
    path: "/v1/mdcv",
    res_as: "application/json",

    body: {
      html: html.value,
      is_published: true,
      md: text.value,
      make_default: true,
      name: name.value || undefined,
    },
  })
}
const is_propose_login_show = ref(false)
watchEffect(() => {
  if (auth.user && is_propose_login_show.value) is_propose_login_show.value = false
})

const handle_pseudo_publish = () => {
  is_propose_login_show.value = true
}
</script>

<template>
  <div>
    <tag-speed-dial class="fixed bottom-4 right-4 z-10">
      <div class="flex flex-col sm:flex-row gap-2">
        <tag-button class="border-green-400" size="sm" v-show="text !== md.edited_str"
          >SAVE</tag-button
        >
        <tag-button class="border-yellow-400" size="sm" v-show="text !== md.edited_str"
          >DISCARD</tag-button
        >
        <tag-button :class="[auth.user ? 'border-purple-400' : 'border-transparent']" size="sm"
          >UPLOAD TO SERVER</tag-button
        >
        <tag-button :class="[auth.user ? 'border-blue-400' : 'border-transparent']" size="sm"
          >PUBLISH AS WEB PAGE</tag-button
        >
        <tag-toggle>
          <span>DEFAULT CV</span>
        </tag-toggle>
      </div>
    </tag-speed-dial>
    <div v-if="auth.user">
      <tag-button v-if="auth.user" @click="handle_publish">Publish</tag-button>
    </div>
    <div v-else>
      <ModalWindow :open="is_propose_login_show">
        <template #title>Please Login First</template>
        <template #message
          >Do this in 1 click with Google! It also open you some other features because we will have
          possibility to indentitify you in future.</template
        >
        <template #buttons>
          <LoginWithGoogleBtn
            v-if="!auth.user"
            @success="(res) => post_sign_in(res).then(handle_publish)"
            @fail="console.error"
          >
            <tag-button>Login with Google</tag-button>
          </LoginWithGoogleBtn>
          <tag-button @click="() => (is_propose_login_show = false)">Cancel</tag-button>
        </template>
      </ModalWindow>
      <tag-button @click="handle_pseudo_publish">Publish</tag-button>
    </div>
    <MdEditor
      :style="{ height: 'fit-content' }"
      :no-mermaid="true"
      :on-html-changed="
        (html_str) => {
          html = html_str
        }
      "
      :toolbars="['pageFullscreen', 'unorderedList', 'title', 'table', 'revoke', 'previewOnly']"
      :preview="!is_mobile"
      v-model="text"
      language="en-US"
      preview-theme="vuepress"
      :no-katex="true"
      :show-toolbar-name="false"
      :showCodeRowNumber="false"
    />
  </div>
</template>
