<script setup lang="ts">
import { post_logout_query } from "@/queries/post_logout.query";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { WrenchScrewdriverIcon } from "@heroicons/vue/24/outline";
import { use_auth } from "@/stores/use_auth.store";

const auth = use_auth();
const profile_navigation = [
  {
    name: "Your Dashboard",
    href: "/dashboard",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];
</script>

<template>
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton
        class="relative inline-flex items-center justify-center p-2 text-emerald-100 hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      >
        <span class="sr-only">Open user menu</span>
        <WrenchScrewdriverIcon class="block h-10 w-10" aria-hidden="true" />
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
        class="absolute right-0 z-20 w-fit bg-transparent items-end flex flex-col"
      >
        <MenuItem
          as="template"
          v-for="item in profile_navigation"
          :key="item.name"
        >
          <t-a :to="item.href">{{ item.name }}</t-a>
        </MenuItem>
        <MenuItem as="template">
          <t-btn @click="post_logout_query" v-if="auth.user">Logout</t-btn>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
