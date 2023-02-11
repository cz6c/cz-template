import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    children: [
      {
        path: "/form",
        component: () => import("@views/form.vue"),
      },
      {
        path: "/table",
        component: () => import("@views/table.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export default router;
