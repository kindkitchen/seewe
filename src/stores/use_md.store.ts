import { defineStore } from "pinia"
import { ref } from "vue"

export const use_md = defineStore("md", () => {
  const edited_str = ref("")

  return {
    edited_str,
  }
})
