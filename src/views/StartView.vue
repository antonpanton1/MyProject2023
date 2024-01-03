<template>
  <div class="start-view">
    <div class="small-button-container">
      <button class="small-button" v-on:click="switchLanguage" style="left: 40px;">{{ uiLabels.changeLanguage }}</button>
      <router-link class="small-button" :to="'/instructions/'" style="right: 40px;">{{ uiLabels.instructions }}</router-link>
    </div>

    <h1 class="game-title">0-100</h1>
    <h2 class="subheading">{{ uiLabels.subHeading }}</h2>
    
    <div class="big-button-container">
    <router-link class="big-button" :to="'/createlobby/'">{{ uiLabels.createGame }}</router-link><br>
    <router-link class="big-button" :to="'/joingame/'">{{ uiLabels.join }}</router-link>
    </div>
  </div> 
</template>

<script>
import ResponsiveNav from "@/components/ResponsiveNav.vue";
import io from "socket.io-client";
//const socket = io("localhost:3000"); //Lämna denna bortkommenterad
//sessionStorage.setItem("dataServer", "192.168.0.103:3000");// Aktivera för att andra på ditt WI-FI ska kunna ansluta. Ändra IP till just ditt wi-fi men ha kvar ':3000'
sessionStorage.setItem("dataServer", "localhost:3000"); // Aktivera för endast för lokal användning
const socket = io(sessionStorage.getItem("dataServer")); // Hämtar det objekt vi skapat på raden över varje gång socket frågas efter

export default {
  name: "StartView",
  components: {
    ResponsiveNav, 
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: localStorage.getItem("lang") || "en",
      hideNav: true,
    };
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en") {
        this.lang = "sv";
      } else {
        this.lang = "en";
      }
      localStorage.setItem("lang", this.lang);
      socket.emit("switchLanguage", this.lang);
    },
    toggleNav: function () {
      this.hideNav = !this.hideNav;
    },
    startGame: function () {
      // Should redirect to the next Game-page
    },
    joinGame: function () {
      // Should redirect to the next Join-page
    },
    instructions: function () {
      // Should redirect to an instructions page
    }
  },
};
</script>

<style scoped>


.start-view {
  background-color: orange;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.game-title {
  color: black;
  font-size: 15vw;
  margin-bottom: -2vh;
  margin-top: 1vh;
}
.subheading {
  margin-bottom: 10vh;
  padding: 5vh;
}
.small-button-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20vw;
  margin-top: 0.1vh;
}
.big-button-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5vw;
}
.big-button{
  text-decoration: none;
  padding: 2vh 2vw;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  background-color: #ff8000;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}
.small-button {
  text-decoration: none;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.75vw;
/*   top: 30px; */
  padding: 1vh 2vw;
  font-size: 1em;
  background-color: #ed2626;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}

.big-button:hover {
  background-color: #f05e16;
}

.small-button:hover {
  background-color: #db0700;
}
</style>