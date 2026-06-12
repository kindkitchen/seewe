<script setup lang="ts">
import { my_fetch } from "@/my_fetch";
import { get_my_mdcvs_query } from "@/queries/get_my_mdcvs.query";
import {
  remove_pdf_query,
  upload_pdf_query,
} from "@/queries/mdcv_pdf.query";
import { put_mdcv_query } from "@/queries/put_mdcv.query";
import { use_auth } from "@/stores/use_auth.store";
import { use_md } from "@/stores/use_md.store";
import { tw } from "@/utils/tw.util";
import { ref } from "vue";
import { useRouter } from "vue-router";

const auth = use_auth();
const md_store = use_md();
const router = useRouter();
const data = await get_my_mdcvs_query();

// `kind` is not in the generated client until gen-types is re-run; widen
// locally so the template can react to the representation.
type CvItem = (typeof data)[number] & {
  kind?: "md" | "pdf";
  to?: string;
};

const build_link = (d: (typeof data)[number]) => {
  const base = import.meta.env.VITE_API_URL;
  if (d.as_regulary_by_name_username) {
    return `${base}/${d.as_regulary_by_name_username[0]}/${
      d.as_regulary_by_name_username[1]
    }`;
  }
  if (d.as_default_by_username) return `${base}/${d.as_default_by_username}`;
  if (d.as_default_by_user_id) return `${base}/id/${auth.user?._id}`;
  return undefined;
};

const mdcvs = ref<CvItem[]>(data.map((d) => ({ ...d, to: build_link(d) })));

// undefined kind == legacy markdown cv
const cv_kind = (cv: CvItem) => cv.kind ?? "md";
const pdf_busy = ref<number | null>(null);

const handle_upload_pdf = async (cv: CvItem, input: HTMLInputElement) => {
  const file = input.files?.[0];
  input.value = ""; // allow re-selecting the same file later
  if (!file) return;
  pdf_busy.value = cv._id;
  try {
    await upload_pdf_query(cv._id, file);
    cv.kind = "pdf";
  } catch (err) {
    alert(err instanceof Error ? err.message : String(err));
  } finally {
    pdf_busy.value = null;
  }
};

const handle_remove_pdf = async (cv: CvItem) => {
  pdf_busy.value = cv._id;
  try {
    await remove_pdf_query(cv._id);
    cv.kind = "md";
  } catch (err) {
    alert(err instanceof Error ? err.message : String(err));
  } finally {
    pdf_busy.value = null;
  }
};

const is_default = (cv: (typeof mdcvs.value)[number]) =>
  !!cv.as_default_by_user_id || !!cv.as_default_by_username;

const handle_edit = (cv: (typeof mdcvs.value)[number]) => {
  if (
    md_store.is_dirty &&
    !confirm("Discard your current unsaved changes and edit this CV instead?")
  ) {
    return;
  }
  md_store.load_cv({ _id: cv._id, md: cv.md, css: cv.css, name: cv.name });
  router.push("/md-cv");
};

const handle_delete = async (id: number) => {
  await my_fetch({
    method: "delete",
    path: "/v1/mdcv/:mdcv_id",
    params: { mdcv_id: id },
    res_as: "none",
  });
  mdcvs.value = mdcvs.value.filter((cv) => cv._id !== id);
  if (md_store.edited_mdcv_id === id) md_store.reset();
};

const toggle_published = async (cv: (typeof mdcvs.value)[number]) => {
  const next = !cv.is_published;
  await put_mdcv_query(cv._id, { is_published: next });
  cv.is_published = next;
};

const toggle_default = async (cv: (typeof mdcvs.value)[number]) => {
  const next = !is_default(cv);
  await my_fetch({
    method: "put",
    path: "/v1/mdcv/:mdcv_id/default",
    params: { mdcv_id: cv._id },
    res_as: "application/json",
    body: { is_default: next },
  });
  // only one default may exist at a time
  mdcvs.value = mdcvs.value.map((c) => ({
    ...c,
    as_default_by_user_id: c._id === cv._id && next
      ? auth.user?._id
      : undefined,
    as_default_by_username: c._id === cv._id && next
      ? auth.user?.nik
      : undefined,
  }));
};
</script>

<template>
  <ol :class='tw("flex flex-col gap-4")'>
    <li
      v-for="cv of mdcvs"
      :key="cv._id"
      :class='tw("rounded border border-gray-200 p-3")'
    >
      <div :class='tw("flex items-center gap-2")'>
        <t-h :n="4">{{ cv.name || cv.md.substring(0, 20) || "Untitled" }}</t-h>
        <span
          v-if="is_default(cv)"
          :class='tw("rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700")'
        >default</span>
        <span
          :class='tw("rounded bg-sky-100 px-2 py-0.5 text-xs text-sky-700")'
        >{{ cv_kind(cv) === "pdf" ? "PDF" : "MD" }}</span>
      </div>

      <template v-if="cv.to">
        <t-a :to="cv.to">{{ cv.to }}</t-a>
        <a
          :href="`${cv.to}.pdf`"
          target="_blank"
          rel="noopener"
          :class='tw("ml-2 text-sm underline")'
        >Download PDF</a>
      </template>

      <div :class='tw("mt-2 flex flex-wrap items-center gap-3")'>
        <t-btn @click="() => handle_edit(cv)">Edit</t-btn>
        <t-btn @click="async () => await handle_delete(cv._id)">Delete</t-btn>

        <label :class='tw("cursor-pointer text-sm underline")'>
          <input
            type="file"
            accept="application/pdf"
            :class='tw("hidden")'
            :disabled="pdf_busy === cv._id"
            @change="(e) => handle_upload_pdf(cv, e.target as HTMLInputElement)"
          />
          {{
            pdf_busy === cv._id
              ? "Uploading…"
              : cv_kind(cv) === "pdf"
                ? "Replace PDF"
                : "Upload PDF"
          }}
        </label>
        <t-btn
          v-if="cv_kind(cv) === 'pdf'"
          @click="async () => await handle_remove_pdf(cv)"
        >Remove PDF</t-btn>

        <label :class='tw("flex items-center gap-1 text-sm")'>
          <input
            type="checkbox"
            :checked="cv.is_published"
            @change="() => toggle_published(cv)"
          />
          Published
        </label>

        <label
          v-if="auth.user?.nik"
          :class='tw("flex items-center gap-1 text-sm")'
        >
          <input
            type="checkbox"
            :checked="is_default(cv)"
            @change="() => toggle_default(cv)"
          />
          Default
        </label>
      </div>
    </li>
  </ol>
</template>
