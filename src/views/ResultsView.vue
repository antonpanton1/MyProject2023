<template>

  <div class="background">
    <p class="gameCode"> {{uiLabels.currentGame}} {{ pollId }}</p>
    <h1 class="title"> {{ uiLabels.results }} </h1>
    <div class="podium">
      <svg width="100%" height="250">
        <rect width="200" height="150" style="fill:rgb(230, 155, 111);stroke-width:3;stroke:rgb(0,0,0)" />
        <text x="50%" y="47%" alignment-baseline="bottom" text-anchor="middle" fill="white"> {{ uiLabels.second }}</text>
        <text v-if="topPlayers.length > 1" x="50%" y="20%" alignment-baseline="bottom" text-anchor="middle" fill="white">{{ topPlayers[1]?.score }}</text>
        <text v-if="topPlayers.length > 1" x="50%" y="10%" alignment-baseline="bottom" text-anchor="middle" fill="white"> {{ topPlayers[1]?.username }} </text>
      </svg>

      <svg width="100%" height="330">     
        <rect width="200" height="230" style="fill:rgb(240, 154, 56);stroke-width:3;stroke:rgb(0,0,0)" />
        <text x="50%" y="60%" alignment-baseline="bottom" text-anchor="middle" fill="white"> {{ uiLabels.first }}</text>
        <text x="50%" y="18%" alignment-baseline="bottom" text-anchor="middle" fill="white">{{ topPlayers[0]?.score }}</text>
        <text x="50%" y="10%" alignment-baseline="bottom" text-anchor="middle" fill="white"> {{ topPlayers[0]?.username }}</text>
      </svg>

      <svg width="210" height="200">
        <rect width="100%" height="100" style="fill:rgb(213, 95, 31);stroke-width:3;stroke:rgb(0,0,0)" />
        <text x="50%" y="35%" alignment-baseline="bottom" text-anchor="middle" fill="white"> {{ uiLabels.third }}</text>
        <text v-if="topPlayers.length > 1" x="50%" y="20%" alignment-baseline="bottom" text-anchor="middle" fill="white"> {{ topPlayers[2]?.score }} </text>
        <text v-if="topPlayers.length > 1" x="50%" y="10%" alignment-baseline="bottom" text-anchor="middle" fill="white"> {{ topPlayers[2]?.username }} </text>
      </svg>        
    </div> 

    <div id="listwrap" v-if="topPlayers.length > 3">
      <h2 style="margin-top: -80px;">{{ uiLabels.losers }} </h2>
      <div class="loserName">
        <div v-for="(topPlayer, index) in topPlayers.slice(3)" :key="topPlayer.id">
          {{ index + 4 }}. {{ topPlayer.username }}
        </div> 
      </div> 
      <div class="loserScore">
        <div v-for="(topPlayer, index) in topPlayers.slice(3)" :key="topPlayer.id">
          {{ topPlayer.score }} <br>
        </div>
      </div>
    </div>
    <div class="button">
      <router-link class="quit" :to="'/'">{{ uiLabels.quit }}</router-link>
    </div>
  </div> 
</template>


<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
    name: 'ResultsView',
   
    data: function () {
      return {
        pollId: "inactive poll",
        userName: "",
        uiLabels: {},
        lang: localStorage.getItem("lang") || "en",
        topPlayers: [],
      };
    },
    created: function () {
      this.pollId = this.$route.params.id
      this.username = this.$route.params.uid
      socket.emit('joinPoll', this.pollId);
      socket.emit('joinedResultsView', this.pollId);
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels
      });
      socket.on("scoreboardUpdate", topPlayers =>
        this.topPlayers = topPlayers
      )
    }
  } 
</script>

<style scoped>
.background {
  background-image: linear-gradient(to bottom right, red, yellow);
  color: rgb(28, 28, 28);
  height: 120vh;
  overflow: hidden;
}

.title {
  color: black;
  font-size: 6vh;
  margin-bottom: 0;
  text-align: center;
  padding: 3vw;
}
.podium {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10vh;
}

svg {
  width: 30vw;
  margin: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

rect {
  width: 100%;
  height: 100%;
  fill: rgb(230, 155, 111);
  stroke-width: 3;
  stroke: rgb(0, 0, 0);
}

#listwrap {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 5vw;
}

.loserName,
.loserScore {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 5vh;
}

.button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5vw;
  flex-direction: row;
  margin-top: 1vh;
  position: absolute;
  left: 75vw;
}

.quit {
  width: auto;
  box-sizing: border-box;
  margin-bottom: 5vw;
  text-decoration: none;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  padding: 1vh 2vw;
  font-size: 1em;
  background-color: #ed2626;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}

.quit:hover {
  background-color: #db0700;
}

.gameCode {
  text-align: left;
  margin-left: 1vw;
  margin-top: 1vw;
}
</style>