<template>

  <body>

    <h1>Correct Answer: {{ this.questions[currentQuestion].a }}</h1><br>

    <div class="slider">
      <vue-slider 
        v-model="answers" 
        disabled="true" 
        :marks="marks" 
        :process="false"
        :railStyle="{ backgroundColor: 'rgb(255, 196, 100)' }"
        :tooltip-style="{ backgroundColor: '#F05E16', borderColor: '#F05E16' }"
      >
        <template v-slot:dot="{ value }">
          <div class="custom-dot"></div>
        </template>
      </vue-slider>
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
 /* const arrayOfPlayers = [
  new Player("test1", "Question1", "answer1", 10),
  new Player("test2", "Question1", "answer2", 30),
  new Player("test3", "Question1", "answer3", 20),
  ] */

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
        answers: [], //spelarnas svar
        marks: 55, //rätt svar
        qurrentQuestion: 0,
        questions: []
      }
    },
    created: function () {
      this.pollId = this.$route.params.id
      this.username = this.$route.params.uid
      socket.on("init", (labels) => {
        this.uiLabels = labels
      });
      socket.on('currentUpdate', current => {
        this.currentQuestion = current
      });
      socket.on("sendQuestions", (questions) => 
      this.questions = questions
    );
      socket.on('allAnswers', answers => {
        this.answers = answers
      });
      socket.emit('joinPoll', this.pollId);
      socket.emit('getGameName', this.pollId);
      socket.emit('name', this.gameName);
      socket.emit('getCurrent', this.pollId)
      socket.emit('getAnswers', {pollId: this.pollId, currentQuestion: this.qurrentQuestion})
      socket.emit("pageLoaded", this.lang);
      socket.emit("getQuestions", this.pollId);

    },
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
  cursor: default;
}
.custom-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
}
  

</style>