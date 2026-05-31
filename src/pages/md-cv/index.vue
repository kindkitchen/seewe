<script setup lang="ts">
import MdSplitEditor from "@/components/MdSplitEditor.vue";
import { put_mdcv_query } from "@/queries/put_mdcv.query";
import { use_md } from "@/stores/use_md.store";
import { tw } from "@/utils/tw.util";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { onUnmounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import UploadMdCvForm from "../../forms/upload_mdcv/UploadMdCvForm.vue";

const toast = useToast();
const is_mobile = window.innerWidth < 500;
const md = use_md();
const is_upload_form_open = ref(false);
const saving = ref(false);

const save_changes = async () => {
  if (md.edited_mdcv_id === undefined) return;
  saving.value = true;
  try {
    await put_mdcv_query(md.edited_mdcv_id, {
      md: md.edited_str,
      css: md.css,
    });
    md.mark_saved();
    toast.add({
      severity: "success",
      summary: "Saved",
      detail: "Your changes were uploaded",
      life: 2000,
    });
  } catch (err) {
    console.error(err);
    toast.add({
      severity: "error",
      summary: "Save failed",
      detail: String(err),
      life: 3000,
    });
  } finally {
    saving.value = false;
  }
};

const start_new = () => {
  if (
    md.is_dirty &&
    !confirm("You have unsaved changes. Discard them and start a new CV?")
  ) {
    return;
  }
  md.reset();
};

// guard against silently losing unsaved work
onBeforeRouteLeave(() => {
  if (md.is_dirty) {
    return confirm("You have unsaved changes. Leave and discard them?");
  }
});
const before_unload = (e: BeforeUnloadEvent) => {
  if (md.is_dirty) {
    e.preventDefault();
    e.returnValue = "";
  }
};
window.addEventListener("beforeunload", before_unload);
onUnmounted(() => window.removeEventListener("beforeunload", before_unload));
</script>

<template>
  <t-h>Markdown CV</t-h>

  <!-- editing context: makes it obvious whether you'd create or overwrite -->
  <div
    :class='tw(
      "flex flex-wrap items-center gap-2 rounded border p-2 text-sm",
      md.is_editing_existing
        ? "border-amber-300 bg-amber-50"
        : "border-emerald-300 bg-emerald-50",
    )'
  >
    <span v-if="md.is_editing_existing">
      Editing existing CV:
      <strong>{{ md.edited_mdcv_name || `#${md.edited_mdcv_id}` }}</strong>
      — "Save changes" overwrites it.
    </span>
    <span v-else>New draft — not saved anywhere yet.</span>
    <span
      v-if="md.is_dirty"
      :class='tw("inline-flex items-center gap-1 text-amber-700")'
    >
      <span :class='tw("h-2 w-2 rounded-full bg-amber-500")'></span>
      unsaved changes
    </span>
  </div>

  <div :class='tw("flex flex-wrap justify-end gap-3 sticky top-2 z-10 my-2")'>
    <Button
      @click="() => (is_upload_form_open = !is_upload_form_open)"
      size="large"
      icon="pi pi-file-plus"
      icon-pos="left"
      :label='is_mobile ? undefined : "Save as new CV"'
      :rounded="is_mobile"
    />
    <Button
      v-show="md.is_editing_existing"
      @click="save_changes"
      :loading="saving"
      severity="warn"
      size="large"
      icon="pi pi-file-edit"
      icon-pos="left"
      :label='is_mobile ? undefined : "Save changes"'
      :rounded="is_mobile"
    />
    <Button
      @click="start_new"
      severity="secondary"
      size="large"
      icon="pi pi-plus"
      icon-pos="left"
      :label='is_mobile ? undefined : "Start new"'
      :rounded="is_mobile"
    />
  </div>

  <MdSplitEditor
    :md="md.edited_str"
    @update:md="md.update_str"
    :css="md.css"
    @update:css="md.update_css"
  />

  <UploadMdCvForm v-model="is_upload_form_open" />
</template>
