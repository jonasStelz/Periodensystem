<template>
  <h3>Level: {{ levelID }}</h3>
  <div v-if="gameMode === 'atomicNum'">
    <p>{{ element.atomic_number }}</p>
    <input type="text" placeholder="Name" v-model="userInputelement.name" />
    <input
      type="text"
      placeholder="Abkürzung"
      v-model="userInputelement.symbol"
    />
  </div>
  <div v-if="gameMode === 'name'">
    <input
      type="number"
      placeholder="Atomzahl"
      v-model="userInputelement.atomic_number"
    />
    <p>{{ element.name }}</p>
    <input
      type="text"
      placeholder="Abkürzung"
      v-model="userInputelement.symbol"
    />
  </div>
  <div v-if="gameMode === 'symbol'">
    <input
      type="number"
      placeholder="Atomzahl"
      v-model="userInputelement.atomic_number"
    />
    <input type="text" placeholder="Name" v-model="userInputelement.name" />
    <p>{{ element.symbol }}</p>
  </div>

  <button @click="checkAnswer">OK</button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import { useStore } from "vuex";
import { User } from "../types";

@Options({
  props: {
    levelID: {
      type: String,
      required: true,
    },
  },
})
export default class LevelView extends Vue {
  levelID!: number; // Define the prop type
  user!: User;
  element: {
    symbol: string;
    name: string;
    atomic_number: number;
    atomic_weight: number;
  } = { symbol: "", name: "", atomic_number: 0, atomic_weight: 0 };
  userInputelement: {
    symbol: string;
    name: string;
    atomic_number: number;
    atomic_weight: number;
  } = { symbol: "", name: "", atomic_number: 0, atomic_weight: 0 };
  gameMode: "atomicNum" | "symbol" | "name" | null = null; //gibt an was bekannt ist, die anderen müssen eingegeben
  store = useStore();
  async mounted() {
    console.log(this.levelID); // Zugriff auf die levelID
    // Daten vom Server laden

    this.user = this.store.state.globalUser;
    await this.newElement();
  }

  async checkAnswer() {
    try {
      this.userInputelement.atomic_weight = this.element.atomic_weight; //Hat keine relevanz
      if (this.gameMode === "atomicNum")
        this.userInputelement.atomic_number = this.element.atomic_number;
      else if (this.gameMode === "name")
        this.userInputelement.name = this.element.name;
      else if (this.gameMode === "symbol")
        this.userInputelement.symbol = this.element.symbol;
      else return;

      console.log(this.element);
      console.log(this.userInputelement);
      if (
        this.element.atomic_number === this.userInputelement.atomic_number &&
        this.element.name === this.userInputelement.name &&
        this.element.symbol === this.userInputelement.symbol &&
        this.levelID < 3 //3 ist das maximale Level
      ) {
        //Das Element aus dem level entfernen und eines höher dazugeben
        console.log("jkleaslökjfdklöasdföklasjdfklop");
        this.user.level[this.levelID - 1] = this.user.level[
          this.levelID - 1
        ].filter((elementsym) => {
          return elementsym !== this.element.symbol;
        });
        this.user.level[this.levelID].push(this.element.symbol);
      } else if (this.levelID > 1) {
        //Das Element aus dem level entfernen und eines höher dazugeben
        this.user.level[this.levelID - 1] = this.user.level[
          this.levelID - 1
        ].filter((elementsym) => {
          return elementsym !== this.element.symbol;
        });
        this.user.level[this.levelID - 2].push(this.element.symbol);
      }
      await this.newElement();
      await axios.put(`/api/updateUserData`, { user: this.user });
      this.store.commit("setUser", this.user);
    } catch (error) {
      console.error("Fehler beim Laden der Daten:", error);
      throw error; // Optionally re-throw the error
    }
  }
  async newElement() {
    this.userInputelement = {
      symbol: "",
      name: "",
      atomic_number: 0,
      atomic_weight: 0,
    };
    if (this.user.level[this.levelID - 1].length - 1 < 0) this.gameMode = null;
    const randomNumber = this.getRandomNumber(
      0,
      this.user.level[this.levelID - 1].length - 1
    );

    if (randomNumber === null) return;
    this.element = await this.loadDataFromServer(
      this.user.level[this.levelID - 1][randomNumber]
    );
    console.log(this.element);
    console.log(this.element.atomic_number);
    this.gameMode = this.getRandomGameMode();
    console.log(this.gameMode);
  }

  getRandomNumber(min: number, max: number): number | null {
    // Math.random() gibt eine Zufallszahl zwischen 0 (inklusive) und 1 (exklusive) zurück
    // Wir multiplizieren es mit (max - min), um den Bereich zu erhalten, und addieren min dazu
    if (max < min) return null;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
  }

  // Function to randomly select a game mode
  getRandomGameMode(): "atomicNum" | "symbol" | "name" {
    console.log("aksdfkjlasöf");
    const gameModes: ("atomicNum" | "symbol" | "name")[] = [
      "atomicNum",
      "symbol",
      "name",
    ];
    const randomIndex = Math.floor(Math.random() * gameModes.length);
    return gameModes[randomIndex];
  }

  async loadDataFromServer(element: string): Promise<{
    symbol: string;
    name: string;
    atomic_number: number;
    atomic_weight: number;
  }> {
    try {
      const response = await axios.post(`/api/getElementData`, { element });

      // Assuming response.data is an object with the required properties
      const data = {
        symbol: response.data.element.symbol,
        name: response.data.element.name,
        atomic_number: response.data.element.atomic_number,
        atomic_weight: response.data.element.atomic_weight,
      };

      return data; // Return the processed data
    } catch (error) {
      console.error("Fehler beim Laden der Daten:", error);
      throw error; // Optionally re-throw the error
    }
  }
}
</script>

<style scoped>
/* Dein CSS-Styling hier */
</style>
