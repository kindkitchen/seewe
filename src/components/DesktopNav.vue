<script setup lang="ts">
import { DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { useRoute } from "vue-router"

const curr_route = useRoute()
const common_navigation = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Markdown CV",
    href: "/md",
  },
  {
    name: "Examples",
    href: "/md/examples",
  },
  {
    name: "__Lab__ DANGER ZONE! (for Pro Developers only!)",
    href: "/lab",
  },
]
</script>

<template>
  <DisclosurePanel class="sm:hidden" v-slot="{ close }">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <DisclosureButton href="#" v-for="item in common_navigation" :key="item.name" as="a">
        <router-link
          @click="close"
          :to="item.href"
          :class="[
            item.href === curr_route.path
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.href === curr_route.path ? 'page' : undefined"
        >
          {{ item.name }}
        </router-link>
      </DisclosureButton>
    </div>
  </DisclosurePanel>
</template>
