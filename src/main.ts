import { createApp } from "vue"
import App from "./App.vue"
import { configure_app } from "./configure_app"
import { register_global_components } from "./register_global_components"

const app = configure_app(createApp(App))

register_global_components(app)

app.mount("#app")
