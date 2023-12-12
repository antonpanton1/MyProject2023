<template>
    <header>
        Current game: {{ pollId }}
    </header>
    <main>
        {{ uiLabels }}
        <h1>{{uiLabels.createPoll}}</h1>
        <input type="text"  placeholder={{uiLabels.username}}>
        <button class="start-button" @click="startGame">
            <router-link v-bind:to="'/startgame/'" style="text-decoration: none; color: inherit;" >Start game</router-link>
        </button>
    </main>

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
        pollId: ""
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
  socket.on('testEmit', (text) => {
    this.testText = text.text; // Update testText with data received from socket
    console.log("testText updated:", this.testText);
  });
}
};

</script>