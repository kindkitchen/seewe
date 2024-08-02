<template>
  <div>
    <div v-if="preview_slug">
      <tag-h size="sm">Preview CV</tag-h>
      <tag-button v-if="preview_slug">
        <a :href="`/cv/${preview_slug}`">{{ `/cv/${preview_slug}` }}</a>
      </tag-button>
    </div>
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
      no-mermaid
      no-katex
      :show-toolbar-name="false"
      :showCodeRowNumber="false"
    />
  </div>
</template>

<script setup lang="ts">
import { use_md } from "@/stores/use_md.store"
import { MdEditor } from "md-editor-v3"
import { ref, watchEffect } from "vue"
import { use_auth } from "@/stores/use_auth.store"
import ModalWindow from "@/components/modal-window/ModalWindow.vue"
import { post_sign_in } from "@/queries/post_sign_in.query"
import LoginWithGoogleBtn from "@/components/LoginWithGoogleBtn.vue"
import { my_fetch } from "@/my_fetch"

const auth = use_auth()
const is_mobile = window.innerWidth < 500
const md = use_md()
const text = ref(md.edited_str)
const html = ref("")
const preview_slug = ref("")
const handle_publish = async () => {
  const res = await my_fetch({
    method: "post",
    path: "/v1/md-cv",
    res_as: "application/json",
    body: {
      html: html.value,
      is_published: true,
      md: text.value,
      user_id: auth.user!._id,
    },
  })
  preview_slug.value = res._id.toString()
}
const is_propose_login_show = ref(false)
watchEffect(() => {
  if (auth.user && is_propose_login_show.value) is_propose_login_show.value = false
})
watchEffect(() => {
  md.update_str(text.value)
})
const handle_pseudo_publish = () => {
  is_propose_login_show.value = true
}
</script>
