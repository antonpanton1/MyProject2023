<template>
  <div class="background">    
    <p class="gameCode"> {{uiLabels.currentGame}} {{ pollId }}</p>
    <div class="mediaContainer"> 
      <div class="writingQuestions">
        {{ uiLabels.writingQuestions }} {{ ready }} / {{ participants.length }} 
      </div>
      <div class="totalPlayers">
        {{ uiLabels.totalPlayers }} {{ participants.length }} 
      </div>
    </div>   
    <div id="gameCode">     
      <h1>{{ uiLabels.gameCode }} {{pollId}}</h1>
      <div>
        <div v-for="(participants) in this.participants">
        {{ participants }}
        </div>
      </div>
    </div>
    <button class="leader" v-if="gameLeader" v-on:click="startGame" type="submit">{{ uiLabels.startGame }}</button>
  </div>
</template>


<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
  name: 'WaitingRoomView',
  
  data: function () {
    return {
      pollId: "inactive poll",
      userName: [],
      uiLabels: {},
      lang: localStorage.getItem("lang") || "en",
      participants: [],
      username: "",
      ready: 0,
      gameLeader: true
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.uid

    socket.on("init", (labels) => {
      this.uiLabels = labels
    });
    socket.on("participantUpdate", (participants) => 
    this.participants = participants,
    );

    socket.on('nextView',() => {
      this.$router.push({ path: '/question/'+this.pollId+'/'+this.username})
    });
    socket.on('isHost', host => {
        this.gameLeader = host
    });
    socket.on('readyUpdate', (ready) => {
      this.ready = ready
      console.log(ready)
    });
    
    socket.emit('hostCheck', {pollId: this.pollId, username: this.username})
    socket.emit('joinPoll', this.pollId);
    socket.emit("joinedWaitingRoom", this.pollId)
    socket.emit("joinedLobby", this.pollId);
    socket.emit("pageLoaded", this.lang);
  },
  methods: {
    startGame: function () {
      socket.emit("nextView", this.pollId)
    }
  }
}
</script>

<style scoped>

.background {
  background-image: linear-gradient(to bottom right, red, yellow);
  height: 100vh;
  overflow: scroll;
}

#gameCode {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55vh;
  font-size: x-large;
}

#playersInGame {
  margin-left: 15vh;
  margin-right: 15vh;
  margin-top: 1vh;
  display: flex;
  justify-content: space-between;
  font-size: large;
}

.gameCode{
    text-align: left;
    margin-left: 1vw;
    margin-top: 1vw;
}
.writingQuestions{
  text-align: left;
  margin-left: 1vw;
  margin-top: 1vw;
}
.totalPlayers{
  text-align: right;
  margin-right: 1vw;
  margin-top: 1vw;
}
.mediaContainer {
  display: flex;
  flex-direction: column;
  gap: 10%;
  justify-content: center;
  align-items: center;
  padding: 0 2vw;
}

.leader {
  padding: 2vh 2vw;
  text-align: center;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  margin: 20px;
  background-color: #ff8000;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}
.leader:hover {
  background-color: #f05e16;
}

</style>