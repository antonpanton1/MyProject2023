<template>
    <button v-on:click="startPoll">Start Poll</button>
    </template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
methods: {
    startPol: function () {
        socket.emit("startPoll", this.pollId);
        }
    },

created: function () {
    socket.on("startPoll", () => {
        this.$router.push("/waitingroom/" + this.pollId + "/" + this.username);
    });
}
}
</script>