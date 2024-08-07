import "./assets/main.css"
// ----------------------------------------------
import { createPinia } from "pinia"
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders"
import { router } from "./router/mod.router"
import { createApp } from "vue"
import { rootClasses } from "./formkit.theme"
import { defaultConfig as fkConfig, plugin as fkPlugin } from "@formkit/vue"
import App from "./App.vue"
import { bricks } from "./bricks"
import TH from "./components/TH.vue"
import TA from "./components/TA.vue"
import { genesisIcons } from "@formkit/icons"

const app = createApp(App).use(createPinia()).use(DataLoaderPlugin, { router }).use(router)

app.use(...bricks.google_sign_in_plugin())
app.use(
  fkPlugin,
  fkConfig({
    config: {
      rootClasses,
    },
    icons: {
      ...genesisIcons,
    },
  }),
)

app.component("t-h", TH)
app.component("t-a", TA)

app.mount("#app")

declare module "vue" {
  export interface GlobalComponents {
    TH: typeof TH
    TA: typeof TA
  }
}
