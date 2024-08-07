import "./assets/main.css"
// ----------------------------------------------
import { createPinia } from "pinia"
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders"
import { router } from "./router/mod.router"
import { createApp } from "vue"
import App from "./App.vue"
import { bricks } from "./bricks"

const app = createApp(App).use(createPinia()).use(DataLoaderPlugin, { router }).use(router)

app.use(...bricks.google_sign_in_plugin())

app.mount("#app")
