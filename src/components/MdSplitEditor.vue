<script setup lang="ts">
import { computed, ref } from "vue";
import { cv_css_presets } from "@/utils/cv-css-presets";
import { tw } from "@/utils/tw.util";

const md = defineModel<string>("md", { required: true });
const css = defineModel<string>("css", { required: true });

const is_mobile = window.innerWidth < 700;
// on mobile the panes stack; this toggles which one is visible
const mobile_pane = ref<"content" | "preview">("content");
const show_css = ref(false);

const escape_html = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Mirror what the server renders (api/utils/SimpleLayout.tsx + spa_subserver):
// raw content inside `pre.cv`, base reset, then user css applied last.
const preview_srcdoc = computed(
  () =>
    `<!doctype html><html><head><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;}
  .cv{white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere;font:inherit;margin:0;}
</style>
<style>${css.value}</style>
</head><body><pre class="cv">${escape_html(md.value)}</pre></body></html>`,
);

const apply_preset = (name: string) => {
  const preset = cv_css_presets.find((p) => p.name === name);
  if (preset) css.value = preset.css;
};
</script>

<template>
  <div :class='tw("flex flex-col gap-3")'>
    <div
      v-if="is_mobile"
      :class='tw("flex gap-2")'
    >
      <t-btn
        :class='mobile_pane === "content" ? "bg-emerald-600 text-white" : ""'
        @click='() => (mobile_pane = "content")'
      >Content</t-btn>
      <t-btn
        :class='mobile_pane === "preview" ? "bg-emerald-600 text-white" : ""'
        @click='() => (mobile_pane = "preview")'
      >Preview</t-btn>
    </div>

    <div :class='tw("grid gap-3", is_mobile ? "grid-cols-1" : "grid-cols-2")'>
      <!-- raw content -->
      <div
        v-show='!is_mobile || mobile_pane === "content"'
        :class='tw("flex flex-col")'
      >
        <label :class='tw("text-sm font-semibold mb-1")'>Content</label>
        <textarea
          :value="md"
          @input="(e) => (md = (e.target as HTMLTextAreaElement).value)"
          spellcheck="false"
          :class='tw(
            "w-full min-h-[400px] resize-y rounded border border-gray-300 p-3",
            "font-mono text-sm leading-relaxed focus:outline-emerald-500",
          )'
          placeholder="Write your CV here. Plain text — styled by your CSS."
        ></textarea>
      </div>

      <!-- live preview (isolated iframe, matches the public page) -->
      <div
        v-show='!is_mobile || mobile_pane === "preview"'
        :class='tw("flex flex-col")'
      >
        <label :class='tw("text-sm font-semibold mb-1")'>Preview</label>
        <iframe
          :srcdoc="preview_srcdoc"
          :class='tw("w-full min-h-[400px] rounded border border-gray-300 bg-white")'
          title="CV preview"
        ></iframe>
      </div>
    </div>

    <!-- styling -->
    <div :class='tw("flex flex-col gap-2")'>
      <div :class='tw("flex flex-wrap items-center gap-2")'>
        <t-btn @click="() => (show_css = !show_css)">
          {{ show_css ? "Hide CSS" : "Edit CSS" }}
        </t-btn>
        <label :class='tw("text-sm text-gray-600")'>Start from preset:</label>
        <select
          :class='tw("rounded border border-gray-300 p-1 text-sm")'
          @change="(e) => apply_preset((e.target as HTMLSelectElement).value)"
        >
          <option value="" disabled selected>Choose…</option>
          <option v-for="p of cv_css_presets" :key="p.name" :value="p.name">
            {{ p.name }}
          </option>
        </select>
      </div>
      <textarea
        v-show="show_css"
        :value="css"
        @input="(e) => (css = (e.target as HTMLTextAreaElement).value)"
        spellcheck="false"
        :class='tw(
          "w-full min-h-[200px] resize-y rounded border border-gray-300 p-3",
          "font-mono text-sm leading-relaxed focus:outline-emerald-500",
        )'
        placeholder="Custom CSS — applied to the public page and PDF."
      ></textarea>
    </div>
  </div>
</template>
