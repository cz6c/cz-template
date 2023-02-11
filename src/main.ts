import { createApp } from "vue";
import App from "./App.vue";
// elementui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

// pinia
import pinia from "@store/index";
// global css
import "@/assets/style/global.scss";
// router
import router from "@/router";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia);
app.use(router);
app.mount("#app");
