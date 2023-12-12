<template>
    <body>

    <main>
        <h2>{{uiLabels.inputGameID}}</h2>
        <input type="text" v-model="pollID">
        <br>
        <button class="start-button" >
            <router-link v-bind:to="'/username/' + pollId " style="text-decoration: none; color: inherit;" >Submit</router-link>
        </button>
    </main>

    </body>
    

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
        pollId: "123",
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
},
    methods:{
        joinID: function(){
            this.pollId = this.pollID
            
        }
    }
};

</script>

<style>
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