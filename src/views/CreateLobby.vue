<template>
  <div class="background">
    <body>
      <main>
        <div class="mediaContainer" v-on:keyup.enter="startPoll">
        <section>
          <h1>{{ uiLabels.nameOfGame }}</h1>
          <input type="text" name="create" v-model="lobby" :placeholder="uiLabels.lobbyname" > 
        </section>
        
        <section>
          <h1>{{ uiLabels.nameOfYou }}</h1>
          <input type="text" v-model="username" :placeholder="uiLabels.username">          
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
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data
    ) 
    socket.emit("pageLoaded", this.lang);
  },
  methods: {
    redirect(pollId) {
      this.$router.push({ path: '/startgame/' + this.pollId + "/" + this.username })
      
    },
    startPoll: function () {
      if (this.lobby.length < 1) {
        return;
      }
      if (this.username.length < 1) {
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

body {
  background-image: linear-gradient(to bottom right, red, yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1{
  margin-bottom: 0;
}

section {
  margin: 10px;
}

input {
  display: inline-block;
}

.joinLobby {
  text-decoration: none;
  font-size: 1.5em; 
  padding: 2vh 2vw;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  background-color: #ff8000;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
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
  font-size: clamp(12px ,5vw, 35px);
  margin-bottom: 2vh;
  margin-top: 1vh;
}
</style>