import * as VueRouter from "vue-router";
import App from "@/App.vue";

export const path = {
  home: "/",
  favorite: "/favorite",
};

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    component: App,
  },
];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
