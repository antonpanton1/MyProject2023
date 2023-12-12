<template>
    <div>
    {{pollId}}
   
    <div v-for="(userName) in participants">
    {{ userName }}
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
<<<<<<< Updated upstream
        userName: "",
        uiLabels: {},
        lang: localStorage.getItem("lang") || "en",
        participants: ["test1", "test2", "test3", "test4"]
=======
        userName: ["test1", "test2"],
        uiLabels: {},
        lang: localStorage.getItem("lang") || "en",
        participants: []
>>>>>>> Stashed changes
        }
    },
    created: function () {
    this.pollId = this.$route.params.id
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
        this.uiLabels = labels
    })
<<<<<<< Updated upstream
    socket.on("participantsUpdate",     )
=======
    socket.on("participantsUpdate", )
>>>>>>> Stashed changes
    socket.emit('joinPoll', this.pollId)

    },
    methods: {
    submitUserName: function () {
        socket.emit("submitUserName", {pollId: this.pollId, name: this.userName})
    }
    }
}
</script>
