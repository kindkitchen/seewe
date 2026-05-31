import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { default_cv_css } from "@/utils/cv-css-presets";

const LS = {
  md: "md",
  css: "md_css",
  id: "md_edited_id",
  name: "md_edited_name",
} as const;

type LoadedCv = {
  _id: number;
  md: string;
  css?: string;
  name?: string;
};

export const use_md = defineStore("md", () => {
  const edited_str = ref(localStorage.getItem(LS.md) || "");
  const css = ref(localStorage.getItem(LS.css) || default_cv_css);
  const stored_id = localStorage.getItem(LS.id);
  const edited_mdcv_id = ref<number | undefined>(
    stored_id ? Number(stored_id) : undefined,
  );
  const edited_mdcv_name = ref<string | undefined>(
    localStorage.getItem(LS.name) || undefined,
  );

  // snapshot of what was last loaded/saved, used to detect unsaved changes
  const original_md = ref(edited_str.value);
  const original_css = ref(css.value);

  const is_dirty = computed(
    () =>
      edited_str.value !== original_md.value ||
      css.value !== original_css.value,
  );

  const is_editing_existing = computed(() =>
    edited_mdcv_id.value !== undefined
  );

  const persist_context = () => {
    if (edited_mdcv_id.value === undefined) {
      localStorage.removeItem(LS.id);
      localStorage.removeItem(LS.name);
    } else {
      localStorage.setItem(LS.id, String(edited_mdcv_id.value));
      if (edited_mdcv_name.value) {
        localStorage.setItem(LS.name, edited_mdcv_name.value);
      } else {
        localStorage.removeItem(LS.name);
      }
    }
  };

  // plain functions: setup stores have no `this`, so actions reference these
  const update_str = (str: string) => {
    edited_str.value = str;
    localStorage.setItem(LS.md, str);
  };
  const update_css = (value: string) => {
    css.value = value;
    localStorage.setItem(LS.css, value);
  };

  return {
    edited_str,
    css,
    edited_mdcv_id,
    edited_mdcv_name,
    is_dirty,
    is_editing_existing,
    update_str,
    update_css,
    // start editing an existing CV (replaces current draft)
    load_cv(cv: LoadedCv) {
      update_str(cv.md);
      update_css(cv.css || default_cv_css);
      edited_mdcv_id.value = cv._id;
      edited_mdcv_name.value = cv.name;
      original_md.value = edited_str.value;
      original_css.value = css.value;
      persist_context();
    },
    // start a fresh, unsaved draft
    reset() {
      update_str("");
      update_css(default_cv_css);
      edited_mdcv_id.value = undefined;
      edited_mdcv_name.value = undefined;
      original_md.value = "";
      original_css.value = css.value;
      persist_context();
    },
    // mark current content as saved; optionally bind to a (new) CV id
    mark_saved(opts?: { _id?: number; name?: string }) {
      if (opts?._id !== undefined) edited_mdcv_id.value = opts._id;
      if (opts?.name !== undefined) edited_mdcv_name.value = opts.name;
      original_md.value = edited_str.value;
      original_css.value = css.value;
      persist_context();
    },
  };
});
