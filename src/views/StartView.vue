<template>

  <div class="start-view">
    <h1 class="game-title">0-100</h1>
    <h2 class="subheading">{{ uiLabels.subHeading }}</h2>

   <!--  <button class="start-button" @click="startGame"><router-link v-bind:to="'/createlobby/'" style="text-decoration: none; color: inherit;">{{ uiLabels.createGame }}</router-link></button><br>
    <button class="join-button" @click="joinGame"><router-link v-bind:to="'/joingame/'" style="text-decoration: none; color: inherit;">{{ uiLabels.joinGameWithCode }}</router-link></button>
   -->
    <!-- nya knappar-->

    <router-link class="big-button" :to="'/createlobby/'">{{ uiLabels.createGame }}</router-link><br>
    <router-link class="big-button" :to="'/joingame/'">{{ uiLabels.join }}</router-link>
    

    <button class="small-button" v-on:click="switchLanguage" style="left: 40px;">{{ uiLabels.changeLanguage }}</button>
   
    <!-- gamla instruktionsknapppen
    <router-link class="instructions-button" :to="'/instructions/'" style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #ed2626; color: #fff; border: none; cursor: pointer;">{{uiLabels.instructions}}</router-link>
  --> 
    <router-link class="small-button" :to="'/instructions/'" style="right: 40px;">{{ uiLabels.instructions }}</router-link>
    

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
}

.game-title {
  color: black;
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

/* button {
  text-decoration: none;
  padding: 20px 20px;
  font-size: 1.5em;
  background-color: darkorange;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
} */

.big-button {
  text-decoration: none;
  padding: 20px 20px;
  font-size: 1.5em;
  background-color: darkorange;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

/* .join-button {
  text-decoration: none;
  padding: 20px 20px;
  font-size: 1.5em;
  background-color: darkorange;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
} */

/* .instructions-button {
  text-decoration: none;
  top: 30px;
  right: 40px;
  padding: 10px 20px;
  font-size: 1em;
  position: absolute;
  background-color: #ed2626;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
} */

.small-button {
  text-decoration: none;
  top: 30px;
  padding: 10px 20px;
  font-size: 1em;
  position: absolute;
  background-color: #ed2626;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}
/* 
.language-button {
  top: 30px;
  left: 40px;
  padding: 10px 20px;
  font-size: 1em;
  position: absolute;
  background-color: #ed2626;
} */

.big-button:hover {
  background-color: #F05E16;
}
.small-button:hover {
  background-color: #db0700;
}


</style>
