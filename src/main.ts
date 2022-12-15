import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import { pinia } from "@/store/store";

const app = createApp(App);

app.use(pinia);
app.mount("#app");
