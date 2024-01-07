<template>
  <div class="background">
    <p class="gameCode"> {{uiLabels.currentGame}} {{ pollId }}</p>
    <div id="gameTitle"> 
      <div class="text">
        <h1>
          <img src= "https://pngimg.com/d/gold_medal_PNG1.png" style="width:40px">
          {{ uiLabels.leaderBoard }} 
          <img src= "https://pngimg.com/d/gold_medal_PNG1.png" style="width:40px">
        </h1>
      </div>
  </div>
  
    <div id="leaderBoard">
      <div id="players">
        <h2> {{ uiLabels.name }} </h2>
        <div v-for="(topPlayer, index) in topPlayers" :key="topPlayer.id">
          <br>
          <div id="names">
            {{ index + 1 }}. {{ topPlayer.username }}
          </div>
        </div>
      </div>

      <div id="scores">
        <h2> {{ uiLabels.scores }} </h2>
          <div v-for="(topPlayers) in topPlayers">
            <br>
            {{ topPlayers.score }}
          </div>
      </div>
    </div>
    
    <div id="picture">
      <img src= "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/Medals_Set_Transparent_PNG_Clip_Art_Image.png?m=1461120901" alt="Span" title = "Another in-line element" style="width: 400px;">
      <img src= "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/Medals_Set_Transparent_PNG_Clip_Art_Image.png?m=1461120901" alt="Span" title = "Another in-line element" style="width: 400px;">
      <img src= "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/Medals_Set_Transparent_PNG_Clip_Art_Image.png?m=1461120901" alt="Span" title = "Another in-line element" style="width: 400px;">
      <img src= "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/Medals_Set_Transparent_PNG_Clip_Art_Image.png?m=1461120901" alt="Span" title = "Another in-line element" style="width: 400px;">
    </div>

    <button v-if="host" v-on:click="goNext" type="submit" id="leader" > 
      {{ uiLabels.nextQuestion }}
    </button>
    <button v-if="host && end" v-on:click="goNext" type="submit" id="results"> visa resultat </button>
  </div>
</template> 


<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
  name: 'leaderboardView',
   
  data: function () {
    return {
      pollId: "inactive poll",
      username: "",
      uiLabels: {},
      lang: localStorage.getItem("lang") || "en",
      topPlayers: [],
      host: false,   
      end: false, 
    };
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.uid
    socket.emit('joinPoll', this.pollId);
    socket.emit('joinedLeaderboardView', this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.emit('hostCheck', {pollId: this.pollId, username: this.username});
    socket.on("init", (labels) => {
      this.uiLabels = labels
    });
    socket.on('isHost', host => {
      this.host = host
    });
    socket.on("scoreboardUpdate", topPlayers =>
    this.topPlayers = topPlayers
    );

    socket.on('endGame', () => {
      this.$router.push({ path: '/results/'+this.pollId})
    });

    socket.on('sendToQuestion', () => {
      console.log("send to question")
      this.$router.push({ path: '/question/'+this.pollId+'/'+this.username})
    })
  },
  methods: {
    goNext: function(){
      socket.emit('nextQuestion', this.pollId);
      socket.emit('goToQuestion', this.pollId);
    }
          
  }
}
</script>

<style scoped>
.background {
  background-image: linear-gradient(to bottom right, red, yellow);
  overflow: hidden;
  height: 110vh
}

#gameTitle {
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 5px;
  flex-direction: column;
  align-items: center;
  font-size: 3vh;
}

#leaderBoard {
  display: flex;
  margin-left: 25vw;
  margin-right: 25vw;
  gap: 30vw;
  justify-content: center
}

#picture {
  position: fixed;
  bottom: 1vh;
  display: flex;
  justify-content: center;
  margin-top: 10vh;

}

#picture img {
  max-width: 100%;
  height: 10vh;
  margin: 0 1vw;
  width: 10vw;
}


#players, #scores {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    font-size: 20px;
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
.gameCode{
    text-align: left;
    margin-left: 1vw;
    margin-top: 1vw;
}
</style>