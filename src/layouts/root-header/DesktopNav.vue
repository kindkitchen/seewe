<script setup lang="ts">
import { DisclosureButton, DisclosurePanel } from "@headlessui/vue";

defineProps<{
  common_navigation: { name: string; href: string }[];
}>();
</script>

<template>
  <DisclosurePanel class="sm:hidden">
    <DisclosureButton
      v-for="item in common_navigation"
      :key="item.name"
      as="template"
    >
      <t-a :to="item.href">
        {{ item.name }}
      </t-a>
    </DisclosureButton>
  </DisclosurePanel>
</template>
