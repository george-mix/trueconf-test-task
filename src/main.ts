import "./style.css";
import { createApp } from "vue";
import { pinia } from "@/store/store";
import App from "./App.vue";

const app = createApp(App);

app.use(pinia);
app.mount("#app");
