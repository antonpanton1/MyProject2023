<template>
    <div class="background">
    <body>
      <main>
<<<<<<< Updated upstream
        <h1>{{ uiLabels.nameOfGame }}</h1>
        <input type="text" name="create" v-model="lobby"> 
        <button class="joinLobby" v-on:click="startPoll" > {{uiLabels.lobby}} </button>
=======
        <h1>What should we call your game?</h1>
        <input type="text" name="create" v-model="lobby">
        <button v-on:click="startPoll" >Create Lobby</button>
>>>>>>> Stashed changes
        
      </main>
    </body>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  const socket = io("localhost:3000");
  

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
    
      };
    },
    created: function () {
      //socket.emit('idUpdate', this.pollId);
<<<<<<< Updated upstream
      
=======
      //socket.emit("pageLoaded", this.lang);
>>>>>>> Stashed changes
      //socket.emit("gameNameUpdate", this.gameName);
  
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
      socket.on("dataUpdate", (data) =>
        this.data = data
      )
      socket.on("pollCreated", (data) =>
        this.data = data)
<<<<<<< Updated upstream
        
      socket.emit("pageLoaded", this.lang);
=======
>>>>>>> Stashed changes
    },
    methods: {
        redirect(pollId) {
            this.$router.push({ path: '/username/'+this.pollId })
            //this.$router.push({ path: `/username/${pollId}` });
    },

    startPoll: function () {
      this.isButtonDisabled = true;
        this.pollId = generateRandomCode();
        this.gameName = this.lobby;
        socket.emit("createPoll", { lang: this.lang, gameName: this.gameName, pollId: this.pollId});

        this.isButtonDisabled = false;
        // Kör metoden som skickar en vidare till korrekt gameId/username
        this.redirect(this.pollId);;
    }
  }
  };
  </script>
  
<<<<<<< Updated upstream
  <style scoped>

.background {
  background-image: linear-gradient(to bottom right, red, yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.joinLobby {
  text-decoration: none;
  padding: 20px 20px;
  font-size: 1.5em;
  background-color: darkorange;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.joinLobby:hover {
  background-color: #F05E16;
=======
  <style>

.background {
  background-image: linear-gradient(to bottom right, red, yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
>>>>>>> Stashed changes
}
</style>