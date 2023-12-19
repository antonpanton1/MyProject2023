<template>
    <body>
    <div id="playersInGame">
        <div id="participantsReady" style="display: inline-block">
            {{ uiLabels.participantsReady }}  spelare som är inne i väntrummet 
        </div>
        <div id="writingQuestions" style="display: inline-block">
            {{ uiLabels.writingQuestions }} {{ this.participantsWritingQuestions }} spelare som fortfarande skriver frågor
        </div>
        <div id="totalPlayers" style="display: inline-block">
            {{ uiLabels.totalPlayers }} {{ participants.length }} totala antal spelare inne på game ID
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

    <button v-if="gameLeader" type="submit" id="leader" > 
        Start Game
    </button>
    </body>
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
        participants: [],
        username: "",
        participantsWritingQuestions: 0,
        gameLeader: true
        }
    },
    created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.uid
    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
        this.uiLabels = labels
    })
    socket.on("participantUpdate", (participants) => 
    this.participants = participants,
    this.participantsWritingQuestions++,
    console.log(this.participantsWritingQuestions, "hej")
    );
    //inte klar
    socket.on("participantsWritingQuestionsUpdate", 
    this.participantsWritingQuestions-- 
    
    );
    //
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
body {
  background-image: linear-gradient(to bottom right, red, yellow);
  flex-direction: column;
  height: 100vh
}

#gameCode {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  font-size: x-large;
}

#playersInGame {
    margin-left: 5vh;
    margin-right: 5vh;
    margin-top: 1vh;
    display: flex;
    justify-content: space-between;
    font-size: large;

}
</style>