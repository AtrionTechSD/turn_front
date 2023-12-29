import { createApp } from "vue";
import { createPinia } from "pinia";
import components from "./boot/components";

import App from "./App.vue";
import router from "./routes";
import "./css/app.css";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
components(app);

app.mount("#app");
