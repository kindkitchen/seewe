import "./assets/main.css"
// ----------------------------------------------
import { createPinia } from "pinia"
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders"
import { router } from "./router/mod.router"
import { createApp } from "vue"
import App from "./App.vue"

const app = createApp(App).use(createPinia()).use(DataLoaderPlugin, { router }).use(router)

app.use(createPinia())
app.use(router)

app.mount("#app")
