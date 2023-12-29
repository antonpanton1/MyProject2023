<template>

  <div class="start-view">

    <div class="small-button-container">
      <button class="small-button" v-on:click="switchLanguage" style="left: 40px;">{{ uiLabels.changeLanguage }}</button>
      <router-link class="small-button" :to="'/instructions/'" style="right: 40px;">{{ uiLabels.instructions }}</router-link>
    </div>

    <h1 class="game-title">0-100</h1>
    <h2 class="subheading">{{ uiLabels.subHeading }}</h2>
    

   <!--  <button class="start-button" @click="startGame"><router-link v-bind:to="'/createlobby/'" style="text-decoration: none; color: inherit;">{{ uiLabels.createGame }}</router-link></button><br>
    <button class="join-button" @click="joinGame"><router-link v-bind:to="'/joingame/'" style="text-decoration: none; color: inherit;">{{ uiLabels.joinGameWithCode }}</router-link></button>
   -->
    <!-- nya knappar-->
    <div class="big-button-container">
    <router-link class="big-button" :to="'/createlobby/'">{{ uiLabels.createGame }}</router-link><br>
    <router-link class="big-button" :to="'/joingame/'">{{ uiLabels.join }}</router-link>
    </div>

  
    

    
   
    <!-- gamla instruktionsknapppen
    <router-link class="instructions-button" :to="'/instructions/'" style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #ed2626; color: #fff; border: none; cursor: pointer;">{{uiLabels.instructions}}</router-link>
  --> 
    

  </div> 

</template>

<script>
import ResponsiveNav from "@/components/ResponsiveNav.vue";
import io from "socket.io-client";
//const socket = io("localhost:3000"); //Lämna denna bortkommenterad
sessionStorage.setItem("dataServer", "192.168.0.103:3000");// Aktivera för att andra på ditt WI-FI ska kunna ansluta. Ändra IP till just ditt wi-fi men ha kvar ':3000'
//sessionStorage.setItem("dataServer", "localhost:3000"); // Aktivera för endast för lokal användning
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
  color: rgb(28, 28, 28);
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
  padding: 2vw 2vw;
  font-size: 1.5em;
  background-color: darkorange;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
}
.small-button {
  text-decoration: none;
  padding: 2vw 2vw;
  font-size: 1.5em;
  background-color: darkorange;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
}

.small-button {
  top: 30px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #ed2626;
}

.big-button:hover {
  background-color: #f05e16;
}

.small-button:hover {
  background-color: #db0700;
}
</style>