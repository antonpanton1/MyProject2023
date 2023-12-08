<template>
  <div class="start-view">
    <h1 class="game-title">0-100</h1>
    <h2 class="subheading">{{ uiLabels.subHeading }}</h2>
    <button class="start-button" @click="startGame"><router-link v-bind:to="'/startgame/'" style="text-decoration: none; color: inherit;" >Start game</router-link></button>
   
    <button class="instructions-button" @click="instructions"><router-link v-bind:to="'/instructions/'" style="text-decoration: none; color: inherit;" >How to play</router-link></button>
  

    <!-- <button v-on:click="instructions-button"> </button> !-->
  </div> 

</template>

<script>
import ResponsiveNav from "@/components/ResponsiveNav.vue";
import io from "socket.io-client";
const socket = io("localhost:3000");

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
      //alert("Game started!");
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
}

.game-title {
  color: rgb(28, 28, 28);
  font-size: 200px;
  margin-bottom: -70px;
  position: center;
  margin-top: -7px;
}

.game-title:hover {
  cursor: default;
}
.subheading {
  margin-bottom: 60px;
  padding: 50px;
}

.subheading:hover {
  cursor: default;
}

.start-button {
  padding: 20px 20px;
  font-size: 1.5em;
  background-color: darkorange;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.instructions-button {
  top: 30px;
  right: 40px;
  padding: 10px 20px;
  font-size: 1em;
  position: absolute;
  background-color: red;
  
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.start-button:hover {
  background-color: #F05E16;
}

.instructions-button:hover {
  background-color: #B80F0A;
}

</style>
