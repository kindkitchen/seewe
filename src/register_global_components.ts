import type { App } from "vue"
import TagButton from "./elements/TagButton.vue"

export const register_global_components = (app: App<Element>): App => {
  app.component("TagButton", TagButton)

  return app
}
