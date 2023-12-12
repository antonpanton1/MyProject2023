<template>
    <div class="playersInGame">
        <div id="participantsReady" style="display: inline-block">{{ uiLabels.participantsReady }} # spelare som är inne i väntrummet</div>
        <div id="writingQuestions" style="display: inline-block">{{ uiLabels.writingQuestions }} # spelare som fortfarande skriver frågor</div>
        <div id="totalPlayers" style="display: inline-block">{{ uiLabels.totalPlayers }} # totala antal spelare inne på game ID</div>
    </div>

    <div class="WaitingRoomViewbackground">
        
        <h1>Game Code:</h1>
        <div>
        {{pollId}}
   
            <div v-for="(userName) in this.participants">
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
        participants: []
        }
    },
    created: function () {
    this.pollId = this.$route.params.id
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
        this.uiLabels = labels
    })
    socket.emit('joinPoll', this.pollId);
    socket.on("participantUpdate", (participants) => 
        this.participants = participants,
        );
    socket.emit("joinedLobby", this.pollId);
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
}

.playersInGame {
    position: absolute;
    align-items: top;
    text-align: center;
    display: grid;
    grid-gap: auto;
    grid-template-columns: 33% 33% 33%;

}
</style>