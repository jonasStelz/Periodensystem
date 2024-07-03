// store.ts

import { createStore } from "vuex";
import { User } from "./types";

const globalUser: User = {
  username: "",
  password: "",
  isAdmin: false,
  level: [],
};
export default createStore({
  state: {
    isLoggedIn: false,
    isAdmin: false,
    globalUser,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setisAdmin(state, value) {
      state.isAdmin = value;
    },
    setUser(state, value: User) {
      state.globalUser = value;
    },
  },
  actions: {
    // Optional: Hier könntest du Aktionen definieren, um den Login-Status zu aktualisieren
  },
  modules: {
    // Hier könntest du Module hinzufügen, wenn deine Anwendung komplexer wird
  },
});
