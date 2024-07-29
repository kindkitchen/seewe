import "./assets/main.css"
// ----------------------------------------------
import { QueryPlugin } from "@pinia/colada"
import { createPinia } from "pinia"
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders"
import type { App } from "vue"
import { router } from "./router/mod.router"
import GoogleSignInPlugin from "vue3-google-signin"

const pinia = createPinia()

export const configure_app = (app: App<Element>): App => {
  app
    .use(GoogleSignInPlugin, {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    })
    .use(pinia)
    .use(QueryPlugin)
    .use(DataLoaderPlugin, { router })
    .use(router)

  return app
}
