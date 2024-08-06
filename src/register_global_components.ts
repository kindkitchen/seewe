import type { App } from "vue"
import TagButton from "@/elements/TagButton.vue"
import TagH from "@/elements/TagH.vue"
import TagLink from "@/elements/TagLink.vue"
import TagSpeedDial from "@/elements/TagSpeedDial.vue"
import TagToggle from "@/elements/TagToggle.vue"
import TagDropdown from "@/elements/TagDropdown.vue"

export const register_global_components = (app: App<Element>): App => {
  app.component("TagButton", TagButton)
  app.component("TagH", TagH)
  app.component("TagLink", TagLink)
  app.component("TagSpeedDial", TagSpeedDial)
  app.component("TagToggle", TagToggle)
  app.component("TagDropdown", TagDropdown)

  return app
}

declare module "vue" {
  export interface GlobalComponents {
    TagLink: typeof TagButton
    TagH: typeof TagH
    TagButton: typeof TagButton
    TagSpeedDial: typeof TagSpeedDial
    TagToggle: typeof TagToggle
    TagDropdown: typeof TagDropdown
  }
}
