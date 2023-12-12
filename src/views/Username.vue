<template>
    <body>
        <header>
        Current game: {{ pollId }}
    </header>
    <main>
        <h2>{{uiLabels.usernamePrompt}}</h2>
        <input type="text" v-model="username">
        <br>
        <button class="start-button" v-on:click="submitUsername">
            <router-link v-bind:to="'/startgame/'" style="text-decoration: none; color: inherit;" >Start game</router-link>
        </button>

    </main>

    </body>
    

</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default{
    name: 'test',
    data: function () {
    return {
        lang: localStorage.getItem("lang") || "en",
        testText: '', // Initialize testText as an empty string
        uiLabels: {},
        pollId: "",
    };
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.emit('joinPoll', this.pollId);
},
    methods:{
        submitUsername: function(){
            socket.emit("submitUsername", {pollId: this.pollId, username: this.username })
            console.log(this.username)
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