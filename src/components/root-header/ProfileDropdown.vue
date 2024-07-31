<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { WrenchScrewdriverIcon } from "@heroicons/vue/24/outline"
import { useRoute } from "vue-router"
import { post_logout_query } from "@/queries/post_logout.query"
import { use_auth } from "@/stores/use_auth.store"

const auth = use_auth()
const curr_route = useRoute()
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
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem
          as="template"
          v-for="item in profile_navigation"
          :key="item.name"
          v-slot="{ active }"
        >
          <router-link
            :to="item.href"
            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
            :aria-current="item.href === curr_route.path ? 'page' : undefined"
            >{{ item.name }}</router-link
          >
        </MenuItem>
        <MenuItem as="template" v-slot="{ active }">
          <div class="flex justify-end pr-1">
            <tag-button
              @click="post_logout_query"
              v-if="auth.user"
              size="sm"
              :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
              :aria-current="undefined"
              >Logout</tag-button
            >
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
