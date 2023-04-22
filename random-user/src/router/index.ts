import VueRouter from "vue-router";

const routes: VueRouter.RouteRecordRaw[] = [];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
