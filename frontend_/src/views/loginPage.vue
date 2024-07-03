<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />
      <br /><br />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <br /><br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { User } from "../types";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const login = async () => {
      try {
        const response = await axios.post("/api/checklogin", {
          username: username.value,
          password: password.value,
        });

        const { message, user } = response.data;
        if (message === "Login successful") {
          // Erfolgreich eingeloggt

          const newUser: User = {
            username: user.username,
            password: user.password,
            isAdmin: user.isAdmin,
            level: user.level,
          };
          store.commit("setUser", newUser);
          console.log(newUser);

          console.log("Login erfolgreich!", user);
          store.commit("setLoggedIn", true);
          router.push("/");
        } else {
          // Login fehlgeschlagen
          console.log("Login fehlgeschlagen: ", message);
          // Hier könntest du entsprechend reagieren, z.B. Fehlermeldung anzeigen
        }
      } catch (error) {
        console.error(
          "Es gab einen Fehler beim Anfordern der Benutzerdaten!",
          error
        );
        // Hier könntest du entsprechend reagieren, z.B. Fehlermeldung anzeigen
      }
    };

    return {
      username,
      password,
      login,
    };
  },
});
</script>

<style scoped>
/* Hier könntest du deine Styles für das Login-Formular definieren */
</style>
