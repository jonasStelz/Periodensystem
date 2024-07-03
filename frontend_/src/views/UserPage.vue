<template>
  /* eslint-disable */
  <div class="users">
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user._id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";

interface User {
  _id: string;
  name: string;
}

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
      console.log("HOMO");
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
