<script setup lang="ts">
import { post_sign_in } from "@/queries/post_sign_in.query"
import { use_auth } from "@/stores/use_auth.store"
import { Disclosure } from "@headlessui/vue"
import DesktopNav from "./DesktopNav.vue"
import LoginWithGoogleBtn from "./LoginWithGoogleBtn.vue"
import MobileNav from "./MobileNav.vue"
import ProfileDropdown from "./ProfileDropdown.vue"

const auth = use_auth()

const success_login = post_sign_in
</script>

<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <MobileNav :open />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <LoginWithGoogleBtn v-if="!auth.user" @success="success_login" @fail="console.error">
            <the-button>Login with Google</the-button>
          </LoginWithGoogleBtn>

          <ProfileDropdown />
        </div>
      </div>
    </div>
    <DesktopNav />
  </Disclosure>
</template>
