<template>

    <div class="WaitingRoomViewbackground">
        <div class="playersInGame">
            <h2> {{ uiLabels.participantsReady }} </h2>
            <h2> {{ uiLabels.writingQuestions }} </h2>
            <h2> {{ uiLabels.totalPlayers }} </h2>
        </div>
        <h1>Game Code:</h1>
        <div>
        {{pollId}}
   
            <div v-for="(userName) in participants">
            {{ userName }}
            </div>
            
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
    name: 'WaitingRoomView',
   
    data: function () {
    return {
        pollId: "inactive poll",
        userName: [],
        uiLabels: {},
        lang: localStorage.getItem("lang") || "en",
        participants: ["test1", "test2", "test3"]
        }
    },
    created: function () {
    this.pollId = this.$route.params.id
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
        this.uiLabels = labels
    })
    socket.on("participantsUpdate", )
    socket.emit('joinPoll', this.pollId)

    },
    methods: {
    submitUserName: function () {
        socket.emit("submitUserName", {pollId: this.pollId, name: this.userName})
    }
    }
}
</script>

<style>
.WaitingRoomViewbackground {
  background-image: linear-gradient(to bottom right, red, yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
},

.playersInGame {
    align-items: top;
}
</style>