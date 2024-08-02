import { createRouter, createWebHistory } from "vue-router/auto"
import { routes } from "vue-router/auto-routes"

export const router = createRouter({
  linkActiveClass: "link-active",
  linkExactActiveClass: "link-exact-active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: "/md",
      redirect: {
        name: "/md/with.[[name]]",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home",
    },
  ],
})

import.meta.hot &&
  import("vue-router/auto-routes").then(({ handleHotUpdate }) => handleHotUpdate(router))
