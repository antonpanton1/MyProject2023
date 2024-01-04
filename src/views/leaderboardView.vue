<template>
  <body>
    <div id="gameTitle"> 
      <h1>
        {{ uiLabels.leaderBoard }} 
      </h1>
    </div>
  
    <div id="leaderBoard">
      <div id="players">
        <h2> {{ uiLabels.name }} </h2>
          <div v-for="(topPlayer, index) in topPlayers" :key="topPlayer.id">
            <div id="names">
              {{ index + 1}}. {{ topPlayer.username }}
            </div>
          </div>
      </div>

      <div id="scores">
        <h2> {{ uiLabels.scores }} </h2>
          <div v-for="(topPlayers) in topPlayers">
            {{ topPlayers.score }}
          </div>
      </div>
    </div>
    
    <div id="picture">
      <img src= "https://static.vecteezy.com/system/resources/previews/019/819/389/non_2x/award-medal-gold-silver-and-bronze-medals-on-transparent-background-file-png.png" alt="Span" title = "Another in-line element" style="width: 200px;">
    </div>

    <button v-if="gameLeader" v-on:click="nextQuestion" type="submit" id="leader" > 
        {{ uiLabels.nextQuestion }}
    </button>
</body>
</template>


<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
  name: 'leaderboardView',
   
  data: function () {
  return {
      pollId: "inactive poll",
      userName: "",
      uiLabels: {},
      lang: localStorage.getItem("lang") || "en",
      topPlayers: [],
      gameLeader: true,      
      };
  },
  created: function () {
  this.pollId = this.$route.params.id
  this.username = this.$route.params.uid
  socket.emit('joinPoll', this.pollId);
  socket.emit('joinedLeaderboardView', this.pollId);
  socket.emit("pageLoaded", this.lang);
      
  socket.on("init", (labels) => {
      this.uiLabels = labels
  });

  socket.on("scoreboardUpdate", topPlayers =>
  this.topPlayers = topPlayers
  )},
  methods: {
    nextQuestion: function () {
      socket.emit("endGame", this.pollId)
      socket.on('endGame', (end) => {
        if (end){
          this.$router.push({ path: '/results/'+this.pollId})
        }else{
          socket.emit('nextQuestion', this.pollId);
          this.$router.push({ path: '/question/'+this.pollId+'/'+this.username})
        }
      })
    }      
  }
}
</script>

<style scoped>
body {
  background-image: linear-gradient(to bottom right, red, yellow);
  flex-direction: column;
  height: 100vh
}

#gameTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10vh;
  font-size: x-large;
}

#leaderBoard {
  
  margin-left: 25vh;
  margin-right: 25vh;
  display: flex;
  justify-content: space-between
}

#picture {
  display: flex;
  justify-content: center;
  margin-top: 40vh;
}

#players, #scores {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
  padding: 2vh 2vw;
  text-align: center;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  background-color: #ff8000;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}
button:hover {
  background-color: #f05e16;
}
</style>