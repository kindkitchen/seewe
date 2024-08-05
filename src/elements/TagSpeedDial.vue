<script setup lang="ts">
import { tw } from "@/utils/tw.util"
import { useAttrs } from "vue"
import { ref } from "vue"

const attrs = useAttrs()
const is_open = ref(false)
</script>
<template>
  <div :class="tw('inline-flex flex-col sm:flex-row sticky gap-2', attrs.class as any)">
    <tag-button
      @click="() => (is_open = !is_open)"
      :class="
        tw(
          'text-2xl font-extrabold  h-12 w-12 rounded-full self-end relative bottom-6 -right-3',
          {
            'bg-gray-600 text-gray-300': is_open,
            'text-gray-200 bg-gray-900': !is_open,
          },
          'sm:hidden relative top-[7rem]',
        )
      "
      >{{ is_open ? "-" : "+" }}</tag-button
    >
    <div :class="[{ hidden: !is_open }, 'sm:block']">
      <slot v-bind="{ is_open }"></slot>
    </div>
  </div>
</template>
