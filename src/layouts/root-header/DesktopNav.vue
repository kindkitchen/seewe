<script setup lang="ts">
import { DisclosureButton, DisclosurePanel } from "@headlessui/vue"

defineProps<{
  common_navigation: { name: string; href: string }[]
}>()
</script>

<template>
  <DisclosurePanel class="sm:hidden">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <DisclosureButton v-for="item in common_navigation" :key="item.name" as="a">
        <t-a :to="item.href">
          {{ item.name }}
        </t-a>
      </DisclosureButton>
    </div>
  </DisclosurePanel>
</template>
