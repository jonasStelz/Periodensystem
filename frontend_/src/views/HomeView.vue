<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <LevelAuswahlFeld levelID="1" />
    <LevelAuswahlFeld levelID="2" />
    <LevelAuswahlFeld levelID="3" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LevelAuswahlFeld from "@/components/LevelAuswahlFeld.vue"; // @ is an alias to /src

@Options({
  components: {
    LevelAuswahlFeld,
  },
})
export default class HomeView extends Vue {}
</script>
