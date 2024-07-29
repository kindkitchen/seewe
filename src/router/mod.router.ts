import { createRouter, createWebHistory } from "vue-router/auto"
import { routes } from "vue-router/auto-routes"

export const router = createRouter({
  linkActiveClass: "opacity-80",
  linkExactActiveClass: "opacity-50",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home",
    },
  ],
})

import.meta.hot &&
  import("vue-router/auto-routes").then(({ handleHotUpdate }) => handleHotUpdate(router))
