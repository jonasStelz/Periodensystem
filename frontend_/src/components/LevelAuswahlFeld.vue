<template>
  <div class="hello">
    <button @click="changeLevel">Level {{ levelID }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    levelID: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const changeLevel = async () => {
      try {
        router.push("/level/" + props.levelID);
        console.log("Level changed");
        // Your change level logic here
      } catch (error) {
        console.error(
          "Es gab einen Fehler beim Anfordern der Benutzerdaten!",
          error
        );
        // Hier könntest du entsprechend reagieren, z.B. Fehlermeldung anzeigen
      }
    };

    return { changeLevel };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
