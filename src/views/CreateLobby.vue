<template>
    <div class="background">
    <body>
      <main>
        <div class="mediaContainer">
        <h1>Title</h1>
        <section>
          <label class="heading">{{ uiLabels.nameOfGame }}</label> 
          <br>
          <input type="text" name="create" v-model="lobby" placeholder="Lobby name"> 
        </section>
        
        <section>
          <label>{{ uiLabels.nameOfYou }}</label>
          <br>
          <input type="text" v-model="username" placeholder="Username">          
        </section>
        
        <br>
        <button class="joinLobby" v-on:click="startPoll" > {{uiLabels.lobby}} </button>
        </div>
      </main>
    </body>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  const socket = io(sessionStorage.getItem("dataServer"));
  

  // Funktion som använder sig av bokstäverna och siffrorna nedan för att skapa en randomiserad kod
  function generateRandomCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
  
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const randomNumber = () => numbers[Math.floor(Math.random() * numbers.length)];
  
    // Kod skapas som skiftar mellan bokstav och siffra
    const code = `${randomLetter()}${randomNumber()}${randomLetter()}${randomNumber()}${randomLetter()}${randomNumber()}`;
  
    return code;
  }
  
  export default {
    name: 'CreateLobby',
    data: function () {
      return {
        lang: localStorage.getItem("lang") || "en",
        pollId: "inactive poll",
        uiLabels: {},
        question: "",
        answers: ["", ""],
        questionNumber: 0,
        data: {},
        gameName: "",
        username:""
      };
    },
    created: function () {
      //socket.emit('idUpdate', this.pollId);
      
      //socket.emit("gameNameUpdate", this.gameName);
  
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
      socket.on("dataUpdate", (data) =>
        this.data = data
      )
      socket.on("pollCreated", (data) =>
        this.data = data)
        
      socket.emit("pageLoaded", this.lang);
    },
    methods: {
        redirect(pollId) {
            this.$router.push({ path: '/startgame/' + this.pollId + "/" + this.username })
            //this.$router.push({ path: `/username/${pollId}` });
    },


    startPoll: function () {

      if (this.lobby.length < 1) {
        return;
      }
      else

      this.isButtonDisabled = true;
        this.pollId = generateRandomCode();
        this.gameName = this.lobby;
        socket.emit("createPoll", { lang: this.lang, gameName: this.gameName, pollId: this.pollId});
        socket.emit("submitUsername", { pollId: this.pollId, username: this.username, host:true });
        this.isButtonDisabled = false;
        // Kör metoden som skickar en vidare till korrekt gameId/username
        this.redirect(this.pollId);;
    }
  }
  };
  </script>
  
<style scoped>

body{
  background-image: linear-gradient(to bottom right, red, yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

section{
  margin: 10px;
}

input{
  display: inline-block;
}

.joinLobby {
  text-decoration: none;
  padding: 2vw 2vw;
  font-size: 1.5em;
  background-color: darkorange;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
}

.joinLobby:hover {
  background-color: #F05E16;
}

input {
  margin: 10px;
  font-size: 1.5em;
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
  margin-bottom: 2vh;
  margin-top: 1vh;
}
</style>