import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "@/router";
import "./style.css";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiMenuFill, RiLayoutGridLine } from "oh-vue-icons/icons";

addIcons(RiMenuFill, RiLayoutGridLine);

const pinia = createPinia();
const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.use(router).use(pinia).mount("#app");
