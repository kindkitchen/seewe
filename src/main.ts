import "./assets/main.css"
// ----------------------------------------------
import { genesisIcons } from "@formkit/icons"
import { defaultConfig as fkConfig, plugin as fkPlugin } from "@formkit/vue"
import { createPinia } from "pinia"
import PrimeVue from "primevue/config"
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders"
import { createApp } from "vue"
import App from "./App.vue"
import { bricks } from "./bricks"
import TA from "./components/TA.vue"
import TBtn from "./components/TBtn.vue"
import TH from "./components/TH.vue"
import { rootClasses } from "./formkit.theme"
import { router } from "./router/mod.router"
import Aura from "@primevue/themes/aura"

const app = createApp(App).use(createPinia()).use(DataLoaderPlugin, { router }).use(router)

app.use(...bricks.google_sign_in_plugin())
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
  },
})
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
app.component("t-btn", TBtn)
app.mount("#app")

declare module "vue" {
  export interface GlobalComponents {
    TH: typeof TH
    TA: typeof TA
    TBtn: typeof TBtn
  }
}
