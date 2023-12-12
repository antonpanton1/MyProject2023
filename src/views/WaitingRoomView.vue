<template>
    <div>
    {{pollId}}
    <input type="text" v-model="userName">
    <button v-on:click="submitUserName"> 
        {{ uiLabels.participateInPoll }}
    </button>
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
        userName: ["test1", "test2"],
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
