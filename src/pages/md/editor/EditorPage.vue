<script setup lang="ts">
import { use_auth } from "@/stores/use_auth.store"
import { use_md } from "@/stores/use_md.store"
import { ref } from "vue"
import { MdEditor } from "md-editor-v3"
import { computed } from "vue"
import { tw } from "@/utils/tw.util"
import ModalWindow from "@/components/modal-window/ModalWindow.vue"
import LoginWithGoogleBtn from "@/components/LoginWithGoogleBtn.vue"
import { post_sign_in } from "@/queries/post_sign_in.query"
import { my_fetch } from "@/my_fetch"

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
/**
 * @name Upload_to_server
 * @description It can be create new or update
 */
const upload_as_default = ref(auth.user?.nik ? false : true)
const handle_upload_to_server_as_new = async () => {
  const res = await my_fetch({
    path: "/v1/mdcv",
    method: "post",
    res_as: "application/json",
    body: {
      html: html_str,
      md: md_str.value,
      is_published: false,
      make_default: upload_as_default.value,
    },
  })
  md.edited_mdcv_id = res._id
}
const handle_upload_to_server_as_update = async () => {
  if (md.edited_mdcv_id) {
    // TODO
  } else {
    console.warn("Unable to update current CV because _id is unknown")
    return
  }
}
// ===========================
/**
 * @name propose_to_sign_in
 */
const show_modal = ref(false)
let after_success_login: () => void
const propose_login = (after: () => void) => {
  after_success_login = () => {
    after()
    show_modal.value = false
  }
  show_modal.value = true
}
</script>
<template>
  <div>
    <tag-speed-dial :class="tw('z-10 fixed right-10 top-80')">
      <template #default>
        <div class="flex flex-col gap-2">
          <!-- Save/Discard -->
          <div class="flex flex-row flex-nowrap gap-0">
            <tag-button
              size="lg"
              :active="is_changed"
              class="relative left-6 top-7 mx-0 bg-green-100 text-black"
              @click="handle_save"
              >Save changes</tag-button
            >
            <tag-button
              size="sm"
              :active="is_changed"
              class="mx-0 bg-yellow-100 text-black"
              @click="handle_discard"
              >Discard</tag-button
            >
          </div>
          <div class="h-[50px]"></div>
          <!-- Upload to server -->
          <tag-dropdown class="z-10" :v-model="false">
            <template #title>
              <tag-button class="bg-blue-100 text-black" size="lg">Upload to server</tag-button>
            </template>
            <template #default="{ set_is_open }">
              <div class="bg-sky-200/50 p-2 rounded-sm flex flex-col">
                <tag-button
                  size="sm"
                  class="bg-slate-800 text-slate-300 w-fit self-end"
                  @click="() => set_is_open(false)"
                  >x</tag-button
                >
                <tag-toggle v-model="upload_as_default">
                  <p
                    :class="
                      tw('text-white bg-black  p-2 rounded-lg', {
                        'bg-blue-800': upload_as_default,
                        'bg-gray-600': !upload_as_default,
                      })
                    "
                  >
                    DEFAULT
                  </p>
                </tag-toggle>
                <div class="flex flex-row flex-nowrap gap-0">
                  <tag-button
                    size="lg"
                    class="relative left-6 top-7 mx-0 bg-green-100 text-black"
                    @click="
                      () => {
                        if (auth.user) {
                          handle_upload_to_server_as_new()
                        } else {
                          propose_login(handle_upload_to_server_as_new)
                        }
                      }
                    "
                    >Upload as new CV</tag-button
                  >
                  <tag-button
                    size="sm"
                    :active="is_changed"
                    class="mx-0 bg-yellow-100 text-black"
                    @click="handle_upload_to_server_as_update"
                    >Update existed</tag-button
                  >
                </div>
              </div>
            </template>
          </tag-dropdown>
        </div>
      </template>
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

  <!-- Modal Window -->
  <ModalWindow :open="show_modal">
    <template #title>
      <h1 class="text-2xl">Please sign in first</h1>
    </template>
    <template #message>
      <p>
        We can't provide you some features without possibility to know who you are next time you
        visit our service.
      </p>
    </template>
    <template #buttons>
      <LoginWithGoogleBtn
        @success="
          (res) => {
            post_sign_in(res)
            after_success_login()
          }
        "
      >
        <tag-button>Sign in with google</tag-button>
      </LoginWithGoogleBtn>
      <tag-button @click="() => (show_modal = false)">Cancel</tag-button>
    </template>
  </ModalWindow>
  <!-- =========== -->
</template>
