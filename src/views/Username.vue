<template>
    <body>
        <header>
        Current game: {{ pollId }}
    </header>
    <main>
        <h1>Hi and welcome to {{ gameName }}!</h1>
        <h3>Please Choose Your Username</h3>
        <input type="text" v-model="username">
        <br>
        <p id="unavailable" >username you tried is unavailable</p>
        <button class="start-button" v-on:click="submitUsername">
            Join Game
        </button>

    </main>

    </body>
    

</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default{
    name: 'username',
    data: function () {
    return {
        lang: localStorage.getItem("lang") || "en",
        pollId: "inactive poll",
        uiLabels: {},
        username: "",
        gameName: "ddd"
    };
  },
  created: function () {
    this.pollId = this.$route.params.id

    socket.on("gameNameUpdate", (gameName)=> 
    {this.gameName = gameName});

    socket.on("init", (labels) => {
      this.uiLabels = labels

    });

    socket.emit('joinPoll', this.pollId);
    socket.emit('getGameName', this.pollId);
    socket.emit('name', this.gameName);
    socket.emit("pageLoaded", this.lang);

    

    

},

methods:{
    submitUsername: function(){
        socket.emit("submitUsername", {pollId: this.pollId, username: this.username})
        this.$router.push({ path: '/startgame/'+this.pollId})
        socket.emit("usernameAvailability", {pollId: this.pollId, username: this.username })

        socket.on("availability", (available) => {
            if (available) {
                socket.emit("submitUsername", { pollId: this.pollId, username: this.username });
                this.$router.push({ path: '/startgame/' + this.pollId + "/" + this.username });
            } else {
                unavailable.style.display = "block";
            }
    })
    }
}
};

</script>

<style>
body {
  background-image: linear-gradient(to bottom right, red, yellow);
  flex-direction: column;
  height: 100vh
}

header{
    text-align: left;
    margin-left: 5px;
    margin-top: 5px;
    
}

main{
    position: fixed; /* or absolute */
    top: 40%;
    left: 50%;
    align-items: center;
    justify-content: center;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

input{
    margin: 10px;
    font-size: 1.5em;
}

#unavailable{
    display:none
}

button{
    background-color:#F05E16 ;
    padding: 5%;
    text-align: center;
    font-size: 1.5em;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition-duration: 0.4s;
}

button:hover{
    color: black;
    background-color: darkorange;
}
</style>