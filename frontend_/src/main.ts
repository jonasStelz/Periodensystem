// main.ts

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Importiere den Vuex-Store

createApp(App)
  .use(router)
  .use(store) // Füge den Vuex-Store zur Anwendung hinzu
  .mount("#app");
