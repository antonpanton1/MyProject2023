<template>

  <body>

    <h1>Correct Answer: 55</h1>

    <div class="slider">
      <vue-slider v-model="value" disabled="true" :marks="marks" :process="false" />
    </div>

  </body>
</template>

<script>
import io from 'socket.io-client'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

const socket = io(sessionStorage.getItem("dataServer"));

function Player(name, question, answer, points) {
  this.name = name;
  this.question = question
  this.answer = answer
  this.points = points
  }
 const arrayOfPlayers = [
  new Player("test1", "Question1", "answer1", 10),
  new Player("test2", "Question1", "answer2", 30),
  new Player("test3", "Question1", "answer3", 20),
  ]

  export default {
    name: 'correctAnswer',

   
   components: {
      VueSlider,
    }, 

    data() {
      return {
        lang: localStorage.getItem("lang") || "en",
        pollId: "inactive poll",
        username: "",
        uiLabels: {},
        value: [0, 10, 20, 55], //spelarnas svar
        marks: [55] //rätt svar
      }
    },
    created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.uid
    socket.on("init", (labels) => {
      this.uiLabels = labels

    });

    socket.emit('joinPoll', this.pollId);
    socket.emit('getGameName', this.pollId);
    socket.emit('name', this.gameName);
    socket.emit("pageLoaded", this.lang);
}
}
</script>

<style scoped>

body {
  background-image: linear-gradient(to bottom right, red, yellow);
  flex-direction: column;
  height: 100vh;
}

.slider {
    width: 50%;
    margin: auto;
    
}

</style>