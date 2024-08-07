<script setup lang="ts">
import { use_auth } from "@/stores/use_auth.store"
import { Disclosure } from "@headlessui/vue"
import DesktopNav from "./DesktopNav.vue"
import MobileNav from "./MobileNav.vue"
import ProfileDropdown from "./ProfileDropdown.vue"
import { post_sign_in } from "@/queries/post_sign_in.query"
import LoginWithGoogleBtn from "@/components/LoginWithGoogleBtn.vue"

const auth = use_auth()
const common_navigation = [
  {
    name: "Home",
    href: "/home",
  },
]
</script>

<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <MobileNav :common_navigation :open />
        <div
          v-if="auth.user"
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <ProfileDropdown />
        </div>
        <LoginWithGoogleBtn v-else @success="post_sign_in" @fail="console.error">
          <t-a to="#">Login with Google</t-a>
        </LoginWithGoogleBtn>
      </div>
    </div>
    <DesktopNav :common_navigation />
  </Disclosure>
</template>
