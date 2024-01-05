<template>
<div class="background">
  
    <div class="header">
    <h1>{{ uiLabels.correctAnswer }} {{ this.questions[currentQuestion]?.a }}</h1><br>
    </div>
    <div class="slider">
      <vue-slider 
        v-model="answers" 
        disabled="true" 
        :marks="[this.questions[currentQuestion]?.a,]" 
        :process="false"
        :railStyle="{ backgroundColor: 'rgb(255, 196, 100)' }"
        :tooltip-style="{ backgroundColor: '#F05E16', borderColor: '#F05E16' }"
      >
        <template v-slot:dot="{ value }">
          <div class="custom-dot"></div>
        </template>
      </vue-slider>
    </div>
    <br><br>
    <button v-if="gameLeader" v-on:click="goToLeaderBoard" type="submit">{{ uiLabels.next }}</button>
  
</div>
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
        marks: [], //rätt svar 
        qurrentQuestion: 0,
        questions: [],
        gameLeader: true
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
      socket.on('isHost', host => {
        this.gameLeader = host
      })
      /* socket.on('goToLeaderBoard',() => {
        this.$router.push({ path: '/leaderboardr/'+this.pollId+'/'+this.username})
      }); */
      socket.on('nextView',() => {
        this.$router.push({ path: '/leaderboard/'+this.pollId+'/'+this.username})
      });
      socket.emit('joinPoll', this.pollId);
      socket.emit('getGameName', this.pollId);
      socket.emit('name', this.gameName);
      socket.emit('getCurrent', this.pollId)
      socket.emit('getAnswers', {pollId: this.pollId, currentQuestion: this.qurrentQuestion})
      socket.emit("pageLoaded", this.lang);
      socket.emit("getQuestions", this.pollId);
      socket.emit('hostCheck', {pollId: this.pollId, username: this.username})
    },
    methods: {
      goToLeaderBoard: function () {
        socket.emit("nextView", this.pollId)
        /* socket.emit("goToLeaderBoard", this.pollId)
        this.$router.push({ path: '/leaderboard/'+this.pollId+'/'+this.username}) */
      }
    }
  }
</script>

<style scoped>

.background {
    background-image: linear-gradient(to bottom right, red, yellow);
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
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


button {
  margin-bottom: 25vh;
  padding: 2vh 2vw;
  text-align: center;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  background-color: #ff8000;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}
button:hover {
  background-color: #f05e16;
}

.header {
  margin-top: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>