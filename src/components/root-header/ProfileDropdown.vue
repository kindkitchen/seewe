<script setup lang="ts">
import { post_logout_query } from "@/queries/post_logout.query"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { WrenchScrewdriverIcon } from "@heroicons/vue/24/outline"
import { use_auth } from "@/stores/use_auth.store"

const auth = use_auth()
const profile_navigation = [
  {
    name: "Your Dashboard",
    href: "/my/dashboard",
  },
  {
    name: "Settings",
    href: "/my/settings",
  },
]
</script>

<template>
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton
        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      >
        <span class="sr-only">Open user menu</span>
        <WrenchScrewdriverIcon class="block h-6 w-6" aria-hidden="true" />
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-gray-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem as="template" v-for="item in profile_navigation" :key="item.name">
          <tag-link :to="item.href">{{ item.name }}</tag-link>
        </MenuItem>
        <MenuItem as="template">
          <div>
            <tag-link to="#" @click="post_logout_query" v-if="auth.user">Logout</tag-link>
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
