import { createApp } from "vue";
import { createPinia } from "pinia";
import components from "./boot/components";

import App from "./App.vue";
import router from "./routes";
import "./css/app.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";
import "./css/custom.css";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
components(app);

app.mount("#app");
