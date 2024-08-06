<script setup lang="ts">
import { useAttrs } from "vue"
import { tw } from "@/utils/tw.util"

const data = useAttrs()
const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg"
    active?: boolean
  }>(),
  {
    active: true,
    size: "md",
  },
)
</script>
<template>
  <button
    :disabled="!active"
    :class="
      tw(
        'text-slate-500 border-slate-500',
        ' hover:bg-slate-500 active:bg-slate-600',
        'mr-1 mb-1 rounded border border-solid',
        'bg-transparent py-2 px-4 text-base font-bold',
        'uppercase outline-none transition-all duration-100',
        'ease-linear hover:text-white focus:outline-none',
        'text-gray-400 hover:bg-gray-700 hover:text-white',
        'focus:outline-none focus:ring-2 focus:ring-inset',
        'focus:ring-white',
        data.class as any,
        {
          'text-xs py-1 px-2': props.size === 'sm',
          'text-sm': props.size === 'md',
          'text-base': props.size === 'lg',
          'bg-gray-700/40 hover:bg-slate-700/40 hover:text-slate-900 text-slate-900 border-none outline-none active:bg-gray-700/40 focus:ring-0':
            !active,
        },
      )
    "
    type="button"
  >
    <slot>click</slot>
  </button>
</template>
