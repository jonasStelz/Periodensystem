<template>
  <div class="add-user">
    <h1>Neuen Benutzer anlegen</h1>
    <form @submit.prevent="handleSubmit">
      <label for="username">Name:</label>
      <input type="text" id="username" v-model="formData.username" required />
      <br />
      <label for="password">Passwort:</label>
      <input
        type="password"
        id="password"
        v-model="formData.password"
        required
      />
      <br />
      <button type="submit">Benutzer anlegen</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";

@Options({
  name: "AddUser",
})
export default class AddUser extends Vue {
  private formData = {
    username: "",
    password: "",
  };

  async handleSubmit() {
    try {
      console.log("kajsdfklö");
      console.log(this.formData);
      const response = await axios.post("/api/users", this.formData);
      console.log("Neuer Benutzer wurde erstellt:", response.data);
      // Hier kannst du z.B. eine Erfolgsmeldung anzeigen oder die Benutzeroberfläche aktualisieren
    } catch (error) {
      console.error("Fehler beim Erstellen des Benutzers:", error);
    }
  }
}
</script>

<style scoped>
.add-user {
  text-align: center;
}
</style>
