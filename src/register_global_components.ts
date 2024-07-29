import type { App } from "vue"
import TheButton from "./elements/TheButton.vue"

export const register_global_components = (app: App<Element>): App => {
  app.component("TheButton", TheButton)

  return app
}
