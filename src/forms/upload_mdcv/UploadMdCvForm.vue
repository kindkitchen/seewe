<script setup lang="ts">
import ModalCmp from "@/components/ModalCmp.vue";
import { DocumentArrowUpIcon } from "@heroicons/vue/24/solid";
import MainForm from "./MainForm.vue";

const show = defineModel<boolean>();
</script>
<template>
  <ModalCmp v-model="show">
    <template #icon>
      <div class="flex justify-center">
        <div class="rounded-full bg-emerald-200 p-2">
          <DocumentArrowUpIcon class="h-10" />
        </div>
      </div>
    </template>
    <template #title> Upload CV </template>
    <template #message>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum optio amet
      quae, dignissimos nostrum laudantium atque sapiente veniam sunt ab unde
      voluptatibus dicta dolor accusantium eveniet sit asperiores fuga?
      Asperiores?
    </template>
    <template #buttons>
      <MainForm
        @done="
          (ok) => {
            if (ok) show = false;
          }
        "
      />
      <t-btn @click="() => (show = false)">Cancel</t-btn>
    </template>
  </ModalCmp>
</template>
