import * as VueRouter from "vue-router";
import All from "@/components/All.vue";
import Favorite from "@/components/Favorite.vue";

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: "/",
    component: All,
  },
  {
    path: "/favorite",
    component: Favorite,
  },
];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
