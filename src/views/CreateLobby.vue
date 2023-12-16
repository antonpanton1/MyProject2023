<template>
  <body>
    <main>
        <h2></h2>
        <input type="text" v-model="username">
        <br>
        <button class="start-button" v-on:click="submitUsername">
            Join game
        </button>

    </main>

    </body>


    <input type="text" name="create" v-model="newId">
    <button v-on:click="startPoll">Create Poll</button>
    </template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default{
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
    };
  },
  created: function () {
    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)
      
      
},
methods:{
    startPoll: function(){
        this.pollId = this.newId
        socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    }
}
};

</script>