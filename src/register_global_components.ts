import type { App } from "vue"
import TagButton from "./elements/TagButton.vue"
import TagH from "./elements/TagH.vue"
import TagLink from "./elements/TagLink.vue"
import TagSpeedDial from "./elements/TagSpeedDial.vue"

export const register_global_components = (app: App<Element>): App => {
  app.component("TagButton", TagButton)
  app.component("TagH", TagH)
  app.component("TagLink", TagLink)
  app.component("TagSpeedDial", TagSpeedDial)

  return app
}

declare module "vue" {
  export interface GlobalComponents {
    TagButton: typeof TagButton
    TagH: typeof TagH
    TagLink: typeof TagLink
    TagSpeedDial: typeof TagSpeedDial
  }
}
