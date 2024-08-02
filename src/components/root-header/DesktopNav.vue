<script setup lang="ts">
import { DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import LoginLogoutPair from "./LoginLogoutPair.vue"

defineProps<{
  common_navigation: { name: string; href: string }[]
}>()
</script>

<template>
  <DisclosurePanel class="sm:hidden">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <DisclosureButton v-for="item in common_navigation" :key="item.name" as="a">
        <tag-link :to="item.href">
          {{ item.name }}
        </tag-link>
      </DisclosureButton>
      <LoginLogoutPair />
    </div>
  </DisclosurePanel>
</template>
