import { defineStore } from "pinia"
import { ref } from "vue"
import { z } from "zod"

export const use_md = defineStore("md", () => {
  const candidate = localStorage.getItem("md")
  const edited_mdcv_id_assumption_candidate = z
    .number({ coerce: true })
    .safeParse(localStorage.getItem("md/_id")).data
  const edited_str = ref(candidate || "")
  const edited_mdcv_id_assumption = ref(
    isNaN(Number(edited_mdcv_id_assumption_candidate))
      ? null
      : edited_mdcv_id_assumption_candidate!,
  )
  const preview_str = ref(candidate || "")

  return {
    edited_str,
    edited_mdcv_id_assumption,
    set_edited_medcv_id(_id: number) {
      edited_mdcv_id_assumption.value = _id
      localStorage.setItem("md/_id", String(_id))
    },
    preview_str,
    update_str(str: string) {
      edited_str.value = str
      localStorage.setItem("md", str)
    },
  }
})
