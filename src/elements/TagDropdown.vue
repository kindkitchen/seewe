<script setup lang="ts">
import { useAttrs } from "vue"
import { tw } from "@/utils/tw.util"

const attrs = useAttrs()
const is_open = defineModel<boolean>()
const set_is_open = (bool: boolean) => {
  is_open.value = bool
}
</script>
<template>
  <div :class="tw('flex flex-col', attrs.class as any)">
    <div @click="is_open = true" v-show="!is_open">
      <slot name="title">
        <tag-button>Title</tag-button>
      </slot>
    </div>
    <div v-show="is_open">
      <slot v-bind="{ is_open, set_is_open }">
        <tag-button>1</tag-button>
        <tag-button>2</tag-button>
        <tag-button>3</tag-button>
      </slot>
    </div>
  </div>
</template>
