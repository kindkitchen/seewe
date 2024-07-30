<script setup lang="ts">
import { tw } from "@/utils/tw.util"

withDefaults(defineProps<{ size?: "sm" | "md" | "lg" }>(), {
  size: "sm",
})
</script>

<template>
  <h2
    :class="
      tw(
        {
          'text-4xl sm:text-6xl': size === 'lg',
          'text-2xl sm:text-4xl': size === 'md',
          'text-xl sm:text-2xl': size === 'sm',
        },
        'font-bold tracking-tight text-white',
      )
    "
  >
    <slot></slot>
  </h2>
</template>
