<template>
  <div id="app">
    <!-- Verwende v-if, um die Navigation basierend auf einer Bedingung anzuzeigen -->
    <nav v-if="isLoggedIn">
      <router-link to="/">Home</router-link>
      <p class="separator">|</p>
      <router-link to="/about">About</router-link>
      <p class="separator">|</p>
      <router-link to="/user">User</router-link>
      <p v-if="user.isAdmin" class="separator">|</p>
      <router-link to="/addUser" v-if="user.isAdmin">Add User</router-link>
    </nav>
    <p>{{ user.username }}</p>

    <router-view />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const isLoggedIn = computed(() => store.state.isLoggedIn);
    const user = computed(() => store.state.globalUser);

    return {
      isLoggedIn,
      user,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center; /* Zentriert den Inhalt horizontal */
  justify-content: flex-start; /* Zentriert den Inhalt vertikal */
  height: 100vh; /* 100% der Bildschirmhöhe einnehmen */
}

nav {
  padding: 30px;
  display: flex;
  align-items: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 10px; /* Abstand zwischen den Links */
}

nav a.router-link-exact-active {
  color: #42b983;
}
.separator {
  margin: 0 10px; /* Abstand für den Trennpunkt "|" */
}
</style>
