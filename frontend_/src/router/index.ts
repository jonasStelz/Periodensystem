import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersPage from "../views/UserPage.vue";
import AddUser from "@/views/addUserPage.vue";
import LoginPage from "../views/loginPage.vue";
import LevelView from "../views/LevelView.vue";
import store from "../store"; // Importieren des Vuex-Store

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "loginPage",
    component: LoginPage,
  },
  {
    path: "/user",
    name: "user",
    component: UsersPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/addUser",
    name: "adduser",
    component: AddUser,
    meta: { requiresAdmin: true },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/level/:levelID",
    name: "LevelView",
    component: LevelView,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Navigationsschutz implementieren
router.beforeEach((to, from, next) => {
  console.log(to.meta.requiresAuth);
  console.log(to);
  if (to.meta.requiresAuth && !store.state.isLoggedIn) {
    next("/login"); // Umleitung zur Login-Seite, wenn nicht authentifiziert
  } else if (
    to.meta.requiresAdmin &&
    (!store.state.isLoggedIn || !store.state.globalUser.isAdmin)
  ) {
    next("/"); // Umleitung zur Startseite, wenn kein Admin oder nicht eingeloggt
  } else {
    next(); // Weiter zur gewünschten Route
  }
});

export default router;
