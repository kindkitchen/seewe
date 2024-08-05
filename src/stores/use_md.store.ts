import { defineStore } from "pinia"
import { ref } from "vue"

export const use_md = defineStore("md", () => {
  const candidate = localStorage.getItem("md")
  const edited_str = ref(candidate || "")
  const preview_str = ref(candidate || "")

  return {
    edited_str,
    preview_str,
    update_str(str: string) {
      edited_str.value = str
      localStorage.setItem("md", str)
    },
  }
})
