<template>
  <div class="background" v-on:keyup.enter="submitUsername">
    <p class="gameCode">{{ uiLabels.currentGame }} {{ pollId }}</p>
    <div class="centering">
      <div class="mediaContainer">
        <h1 class="heading"> {{ uiLabels.welcomeMessage }} {{ gameName }}!</h1>
        <h3> {{uiLabels.pleaseChoose}} </h3>
        <input type="text" autofocus v-model="username" id="uername"  v-on:keyup.enter="submitUsername" :placeholder="uiLabels.username">
        <br>
        <p id="unavailable">Hej</p>
        <button class="start-button" v-on:click="submitUsername">{{ uiLabels.join }}</button>
      </div>
    </div>
  </div>
</template>


<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default{
  name: 'username',
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en",
      pollId: "inactive poll",
      uiLabels: {},
      username: "",
      gameName: ""
    };
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('getGameName', this.pollId);

    socket.emit('name', this.gameName);
    socket.on("gameNameUpdate", (gameName)=> {
      this.gameName = gameName
    });
    socket.on("init", (labels) => {
      this.uiLabels = labels
    });
    socket.emit('joinPoll', this.pollId);
    socket.emit('getGameName', this.pollId);
    socket.emit('name', this.gameName);
    socket.emit("pageLoaded", this.lang);
    socket.on("availability", (available) => {
        if (available) {
          socket.emit("submitUsername", { pollId: this.pollId, username: this.username, host:false });
          this.$router.push({ path: '/startgame/' + this.pollId + "/" + this.username });
        }
        else
        unavailable.style.display = "block";
      })
  },
  methods:{
    submitUsername: function(){
      if (this.username.length < 1) {
        return;
      }
      else
      socket.emit("usernameAvailability", {pollId: this.pollId, username: this.username })
      
    }
  }
};
</script>


<style scoped>
.background {
  background-image: linear-gradient(to bottom right, red, yellow);
  height: 100vh;
  overflow: hidden;
}
.centering {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.gameCode {
  text-align: left;
  margin-left: 1vw;
  margin-top: 1vw;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input {
  margin: 1vw;
  font-size: 1.5em;
}

#unavailable {
  display:none
}

button {
  text-align: center;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  padding: 2vh 2vw;
  border-radius: 1vw;
  background-color: #ff8000;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
  transition-duration: 0.4s;
}

button:hover {
  background-color: #f05e16;
  transition-duration: 0.1s;
}

.mediaContainer {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5vw;
}
.heading {
  color: black;
  font-size: 6vw;
  font-size: clamp(12px ,5vw, 35px);
  margin-bottom: 2vh;
  margin-top: 1vh;
}
</style>