import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "@/router";
import "./style.css";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  RiMenuFill,
  RiLayoutGridLine,
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiCloseFill,
} from "oh-vue-icons/icons";
import VueScreen from "vue-screen";

addIcons(
  RiMenuFill,
  RiLayoutGridLine,
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiCloseFill
);

const pinia = createPinia();
const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.use(VueScreen, "tailwind").use(router).use(pinia).mount("#app");
