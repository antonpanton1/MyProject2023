<template>
    <div>
    {{pollId}}
    <input type="text" v-model="userName">
    <button v-on:click="submitUserName"> 

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
        userName: ""
    }
    },
    created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
   
    },
    methods: {
    submitUserName: function () {
        socket.emit("submitUserName", {pollId: this.pollId, name: this.userName})
    }
    }
}
</script>
