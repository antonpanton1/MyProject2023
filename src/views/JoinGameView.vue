<template>
    <body>

    <main>
        <h2>{{uiLabels.inputGameID}}</h2>
        <input type="text" v-model="idCode">
        <br>
        <button class="start-button" v-on:click="joinID"> {{ uiLabels.join }}</button>
    </main>

    </body>
    

</template>

<script>
import io from 'socket.io-client';
import { toDisplayString } from 'vue';
const socket = io("localhost:3000");


export default{
    name: 'test',
    data: function () {
    return {
        lang: localStorage.getItem("lang") || "en",
        uiLabels: {},
        pollId: "inactive poll",
        idCode: ""
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
    socket.on("createPoll", (data) =>
        this.data = data
      )
     
},
methods: {
    redirect(pollId) {
            this.$router.push({ path: '/username/'+this.pollId })
    },

    joinID: function () {
        this.pollId = this.idCode
        socket.emit('idCheck', this.pollId)

        socket.on('idAvailable', (available) => {
            if(available){
                this.$router.push({ path: '/username/'+this.pollId })
            }else console.log('The GameID was entered wrong. Please try again')
        })
},

}
}

</script>

<style scoped>
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