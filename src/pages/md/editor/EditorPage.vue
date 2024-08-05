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
let html = ""
const name = ref<string | undefined>(auth.user?.nik ? "" : undefined)
const handle_update = async (
  mdcv_id: number,
  data_to_update: {
    md?: string
    html?: string
    is_published?: boolean
    name?: string
    make_default?: boolean
  },
) => {
  const res = await my_fetch({
    method: "put",
    path: "/v1/mdcv/:mdcv_id",
    params: {
      mdcv_id,
    },
    body: data_to_update,
    res_as: "application/json",
  })
}
const handle_create_new = async () => {
  const res = await my_fetch({
    method: "post",
    path: "/v1/mdcv",
    res_as: "application/json",
    body: {
      html,
      is_published: false,
      md: text.value,
      make_default: true,
      name: name.value || undefined,
    },
  })
  md.set_edited_medcv_id(res._id)
}
let on_success_sign_in_after_proposition: () => void
const propose_sign_in = (next: typeof on_success_sign_in_after_proposition) => {
  is_propose_login_show.value = true
  on_success_sign_in_after_proposition = next
}
const is_propose_login_show = ref(false)
watchEffect(() => {
  if (auth.user && is_propose_login_show.value) is_propose_login_show.value = false
})
const handle_save_click = () => {
  md.update_str(text.value)
}
const handle_discard_click = () => {
  text.value = md.edited_str
}
const is_default = ref(auth.user?.nik ? false : true)
</script>

<template>
  <div>
    <tag-speed-dial class="fixed bottom-4 right-4 z-10">
      <div class="flex flex-col gap-2 bg-gradient-to-tl from-gray-500 to-black p-3 rounded-lg">
        <tag-button
          @click="handle_save_click"
          class="border-green-400"
          size="sm"
          v-show="text !== md.edited_str"
          >Save</tag-button
        >
        <tag-button
          @click="handle_discard_click"
          class="border-yellow-400"
          size="sm"
          v-show="text !== md.edited_str"
          >Discard Changes</tag-button
        >
        <tag-button
          @click="
            auth.user?.nik && md.edited_mdcv_id_assumption
              ? () => handle_update
              : auth.user
                ? handle_create_new
                : () => propose_sign_in(handle_create_new)
          "
          :class="[auth.user ? 'border-purple-400' : 'border-transparent']"
          size="md"
          >Update on server</tag-button
        >
        <tag-button
          @click="auth.user ? handle_create_new : () => propose_sign_in(handle_create_new)"
          :class="[auth.user ? 'border-blue-400' : 'border-transparent']"
          size="lg"
          >publish as web page</tag-button
        >
        <tag-toggle v-model="is_default">
          <span>Default</span>
        </tag-toggle>
      </div>
    </tag-speed-dial>
    <div v-if="auth.user">
      <tag-button v-if="auth.user" @click="handle_create_new">Publish</tag-button>
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
            @success="
              (res) =>
                post_sign_in(res).then(
                  on_success_sign_in_after_proposition ||
                    (() => console.error('on_success_sign_in_after_proposition is not defined')),
                )
            "
            @fail="console.error"
          >
            <tag-button>Login with Google</tag-button>
          </LoginWithGoogleBtn>
          <tag-button @click="() => (is_propose_login_show = false)">Cancel</tag-button>
        </template>
      </ModalWindow>
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
