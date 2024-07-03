import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersPage from "../views/UserPage.vue";
import AddUser from "@/views/addUserPage.vue";
import LoginPage from "../views/loginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: LoginPage,
  },
  {
    path: "/user",
    name: "user",
    component: UsersPage,
  },
  {
    path: "/addUser",
    name: "adduser",
    component: AddUser,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
