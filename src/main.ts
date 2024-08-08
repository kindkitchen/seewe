import "@/assets/main.css"
import "md-editor-v3/lib/style.css"
import "primeicons/primeicons.css"
// ----------------------------------------------
import App from "@/App.vue"
import { bricks } from "@/bricks"
import TA from "@/components/TA.vue"
import TBtn from "@/components/TBtn.vue"
import TH from "@/components/TH.vue"
import { fkPlugin } from "@/plugins/formkit.plugin"
import { primePlugin } from "@/plugins/primevue.plugin.vue"
import { router } from "@/router/mod.router"
import { createPinia } from "pinia"
import ToastService from "primevue/toastservice"
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders"
import { createApp } from "vue"

const app = createApp(App)
  .use(createPinia())
  .use(DataLoaderPlugin, { router })
  .use(router)
  .use(...bricks.google_sign_in_plugin())
  .use(...primePlugin)
  .use(ToastService)
  .use(...fkPlugin)

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
