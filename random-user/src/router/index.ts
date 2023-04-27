import * as VueRouter from "vue-router";
import App from "@/App.vue";

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
