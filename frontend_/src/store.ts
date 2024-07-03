// store.ts

import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
  },
  actions: {
    // Optional: Hier könntest du Aktionen definieren, um den Login-Status zu aktualisieren
  },
  modules: {
    // Hier könntest du Module hinzufügen, wenn deine Anwendung komplexer wird
  },
});
