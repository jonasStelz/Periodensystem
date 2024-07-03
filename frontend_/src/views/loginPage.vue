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

export default defineComponent({
  name: "LoginPage",
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const login = () => {
      // Hier könntest du die tatsächliche Authentifizierungslogik implementieren
      // Zum Beispiel: Überprüfung von Benutzername und Passwort mit einem Server

      // Für dieses Beispiel nehmen wir an, dass die Authentifizierung erfolgreich ist
      store.commit("setLoggedIn", true);

      // Optional: Weiterleitung zur Startseite oder zu einer geschützten Seite
      router.push("/");
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
