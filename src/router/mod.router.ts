import { use_auth } from "@/stores/use_auth.store";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

export const router = createRouter({
  linkActiveClass: "link-active",
  linkExactActiveClass: "link-exact-active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home",
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.private && !use_auth().user) {
    return "/home";
  }
});

import.meta.hot &&
  import("vue-router/auto-routes").then(({ handleHotUpdate }) =>
    handleHotUpdate(router)
  );
