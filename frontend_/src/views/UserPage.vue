<template>
  <div class="users">
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.username">{{ user.username }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import { User } from "../types";

@Options({
  name: "UsersPage",
})
export default class UsersPage extends Vue {
  private users: User[] = [];

  mounted() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await axios.get<User[]>("/api/users");
      this.users = response.data;
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  }
}
</script>

<style scoped>
.users {
  text-align: center;
}
</style>
