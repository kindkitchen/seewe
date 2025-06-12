<script setup lang="ts">
import { DisclosureButton } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

defineProps<{
  open: boolean;
  common_navigation: { name: string; href: string }[];
}>();
</script>

<template>
  <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
    <DisclosureButton
      class="relative inline-flex items-center justify-center p-2 text-emerald-100 hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    >
      <span class="absolute -inset-0.5"></span>
      <span class="sr-only">Open main menu</span>
      <Bars3Icon v-if="!open" class="block h-10 w-10" aria-hidden="true" />
      <XMarkIcon v-else class="block h-10 w-10" aria-hidden="true" />
    </DisclosureButton>
  </div>
  <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    <div class="hidden sm:ml-6 sm:block">
      <div class="flex space-x-4">
        <t-a
          v-for="item in common_navigation"
          :to="item.href"
          :key="item.name"
        >{{ item.name }}</t-a>
      </div>
    </div>
  </div>
</template>
