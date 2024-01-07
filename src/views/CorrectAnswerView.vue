<template>
<div class="background">
  <p class="gameCode">{{uiLabels.currentGame}} {{ pollId }}</p>
  
    <div class="header">
      <h1>{{ uiLabels.correctAnswer }} {{ this.questions[currentQuestion]?.a }}</h1><br>

      <h2>{{ uiLabels.allAnswers }}</h2><br>
    </div>

    <div class="sliderA">
      <div class="sliderB">
        <vue-slider 
          v-model="answers" 
          :disabled="true" 
          :marks="[this.questions[currentQuestion]?.a]"
          :process="false"
          :railStyle="{ backgroundColor: '#a94411' }"
          :tooltip-style="{ backgroundColor: '#F05E16', borderColor: '#F05E16' }"
        >
          <template v-slot:dot="{ value }">
            <div class="custom-dot"></div>
          </template>
        </vue-slider>
      </div>
      <div class="sliderB">
        <vue-slider 
          v-model="yourAnswer" 
          :disabled="true" 
          :marks="[this.questions[currentQuestion]?.a]"
          :process="false"
          :railStyle="{ backgroundColor: '#a94411' }"
          :tooltip="'always'"
          :tooltip-style="{ backgroundColor: '#F05E16', borderColor: '#F05E16' }"
        >
          <template v-slot:dot="{ value }">
            <div class="custom-dot"></div>
          </template>
        </vue-slider>
      </div>
    </div>
    <br>
    <h4>{{ uiLabels.youAnswerd }} {{ this.yourAnswer }} {{ uiLabels.andGot }} {{ this.score }} {{ uiLabels.points }}</h4>
    <br>
    <button v-if="gameLeader" v-on:click="goToLeaderBoard" type="submit">{{ uiLabels.next }}</button>
  
</div>
</template>

<script>
import io from 'socket.io-client'
import { vShow } from 'vue';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

const socket = io(sessionStorage.getItem("dataServer"));

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
      answers: [], 
      marks: [], 
      currentQuestion: 0,
      questions: [],
      gameLeader: true,
      yourAnswer: 50,
      score: 1,
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
      socket.on('YourAnswer', yourAnswer => {
        this.yourAnswer = yourAnswer
        this.score = Math.abs(this.questions[this.currentQuestion].a - this.yourAnswer)
        if (this.score == 0){
          this.score = -10;
        } 
      });

    socket.on('isHost', host => {
      this.gameLeader = host
    });
    socket.on('sendToLeaderboard',() => {
      this.$router.push({ path: '/leaderboard/'+this.pollId+'/'+this.username})
    });
    socket.emit('joinPoll', this.pollId);
    socket.emit('getGameName', this.pollId);
    socket.emit('name', this.gameName);
    socket.emit('getCurrent', this.pollId);
    socket.emit('getAnswers', {pollId: this.pollId, currentQuestion: this.currentQuestion})
    socket.emit("pageLoaded", this.lang);
    socket.emit("getQuestions", this.pollId);
    socket.emit('hostCheck', {pollId: this.pollId, username: this.username});
      socket.emit('getYourAnswer', {pollId: this.pollId, username: this.username});
  },
  methods: {
    goToLeaderBoard: function () {
      socket.emit("goToLeaderboard", this.pollId)
    }
  }
}
</script>

<style scoped>

.background {
  background-image: linear-gradient(to bottom right, red, yellow);
  height: 100vh;
  overflow: scroll;
}

.sliderA {
  width: 50%;
  margin: auto;
  cursor: default;
  position: relative;
}

.sliderB {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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

.gameCode{
    text-align: left;
    margin-left: 1vw;
    margin-top: 1vw;
}


</style>