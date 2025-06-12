<script lang="ts" setup>
import { tw } from "@/utils/tw.util";

withDefaults(
  defineProps<{
    relative_tw?: string;
  }>(),
  {
    relative_tw: "",
  },
);

const is_guard_active = defineModel<boolean>({ required: true });
</script>
<template>
  <div>
    <div
      :class='
        tw({
          "blur-sm": is_guard_active,
          "pointer-events-none": is_guard_active,
        })
      '
    >
      <slot>
        <label for="test-checkbox">Is it ok?</label>
        <input
          id="test-checkbox"
          name="is-it-ok"
          type="checkbox"
          :value="false"
        />
      </slot>
    </div>
    <div :class='tw("relative", relative_tw)' v-show="is_guard_active">
      <slot name="guard">
        <t-btn @click="() => (is_guard_active = false)">First click me!</t-btn>
      </slot>
    </div>
  </div>
</template>
