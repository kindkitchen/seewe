<script setup lang="ts">
import { tw } from "@/utils/tw.util"
import { ref } from "vue"

const is_open = ref(false)
</script>
<template>
  <div class="inline-flex flex-col sm:flex-row sticky gap-2">
    <tag-button
      @click="() => (is_open = !is_open)"
      :class="
        tw(
          'text-2xl font-extrabold  h-12 w-12 rounded-full',
          {
            'bg-gray-600 text-gray-300': is_open,
            'text-gray-200 bg-gray-900': !is_open,
          },
          'sm:hidden',
        )
      "
      >{{ is_open ? "-" : "+" }}</tag-button
    >
    <div :class="[{ hidden: !is_open }, 'sm:block']">
      <slot v-bind="{ is_open }"></slot>
    </div>
  </div>
</template>
