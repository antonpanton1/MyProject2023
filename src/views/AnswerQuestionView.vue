<template>
  <div class="background" v-on:keyup.enter="lockAnswer">
      <h1>{{ uiLabels.dispQuestion }}</h1>
      <br>
      <h2>{{this.questions[currentQuestion]?.q}}?</h2>
      <br>
      <button id="minus"  class="answer" v-on:click="decrease" v-on:keydown.enter.prevent>-</button>
      <input  id="number" type="number" min="0" max="100" step="1" for="rangeSlider" class="sliderValue" v-model="answer"  >         
      <button id="plus" class="answer" v-on:click="increase" v-on:keydown.enter.prevent>+</button>
      <div class="answerSlide">
          <input type="range" id="rangeSlider" min="0" max="100" step="1" class="slider" v-model="answer">
      </div>
      <br>
      <button class="submit" id="lockBtn" v-on:click="lockAnswer" > {{ uiLabels.lockIn }} </button>
      <p id="waiting"> {{ uiLabels.waitingOthers }} {{this.answered}} / {{ this.participants.length }}</p>
      <br>
      <button class="submit" id="nextPage" v-on:click="goNext">{{ uiLabels.goNext }}</button>

    </div>
</template>
  
<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
  name: 'answerQuestionsView',
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en",
      pollId: "inactive poll",
      questions: [],
      answer: 50,
      username: "",
      currentQuestion: 0,
      uiLabels: {},
      host: false,
      participants: [],
      answered: 0,
      locked: false,
    }
  },

  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.uid
    this.locked = false
    socket.on("init", (labels) => {
      this.uiLabels = labels
    });
    socket.on('lockIn', () =>
    this.lockAnswer()
    );
    socket.on('goToCorrectAnswer',() => {
      this.$router.push({ path: '/correctanswer/'+this.pollId+'/'+this.username})
    });
    socket.on("sendQuestions", (questions) => 
      this.questions = questions,
    );
    socket.on('isHost', host => {
        this.host = host
    })
    socket.on('currentUpdate', (current) => 
      this.currentQuestion = current
    );
    socket.on('totalPlayers', (players) => 
    this.participants = players
    );
    socket.on('answerSubmitted', () => 
      this.answered +=1
    );
  
    socket.emit('joinPoll', this.pollId);
    socket.emit('hostCheck', {pollId: this.pollId, username: this.username});
    socket.emit('getCurrent', this.pollId);
    socket.emit("getQuestions", this.pollId);
    socket.emit('totalPlayers', this.pollId)
    socket.emit("pageLoaded", this.lang);
  },
  methods: {
      increase: function(){
          this.answer ++;
      },
      decrease: function(){
          this.answer --;
      },
      lockAnswer: function(){
        if(!this.locked){
          this.locked = true;
          lockBtn.disabled = true;
          lockBtn.classList.toggle("submit");
          lockBtn.textContent = "Answer locked"
          rangeSlider.disabled = true;
          plus.disabled = true;
          plus.classList.toggle("answer");
          minus.disabled = true;
          minus.classList.toggle("answer");
          number.disabled = true;
          waiting.style.display = "block"

          if(this.host){
            nextPage.style.display ="inline-block";
          }

          socket.emit("submitAnswer", {pollId: this.pollId, username: this.username, answer: this.answer})
          socket.emit('calculateScore', {pollId: this.pollId, username: this.username, answer: this.answer})
        }
      },
      goNext: function(){

        socket.emit('lockScores', this.pollId)
        socket.emit("sendToCorrectAnswer", this.pollId)
      }
  }
}
</script>
  
<style scoped>
.background {
  background-image: linear-gradient(to bottom right, red, yellow);
  height: 100vh;
  overflow: hidden;
}


input {
    font-size: 24pt;
    width: 40pt;
    background: transparent;
    border: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number]{
    -moz-appearance: textfield;
}

button {
  background-color: #a94411;
  margin: 20px;
  /*padding: 3%;*/
  padding: 2vh 2vw;
  text-align: center;
  font-size: 24px;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}

.answer {
    background-color:#ff8000;
    margin: 10px;
    text-align: center;
    font-size: 1.5em;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition-duration: 0.4s;
}

.answer:hover {
  background-color: #f05e16;
}

.answerSlide {
  width: 100%;
}

.slider {
  width: 50%;
  background: rgb(255, 196, 100);
  -webkit-appearance: none;
  outline: none; /* Remove outline */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
  cursor: pointer; /* Cursor on hover */
  border-radius: 30px;
}

.slider::-webkit-slider-runnable-track {
  height: 0.3rem;
}

/******** Firefox ********/
.slider::-moz-range-track {
  height: 0.3rem;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  height: 1.2rem;
  width: 1.2rem;
  background: white;
  margin-top: -7px;
  border-radius: 50%;
}

.slider::-moz-range-thumb {
  border: none; /*Removes extra border that FF applies*/
  border-radius: 0; /*Removes default border-radius that FF applies*/
  background-color: red;
  height: 15px;
  width: 15px;
}

.submit {
  text-align: center;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  font-size: 1.5em;
  padding: 2vh 2vw;
  border-radius: 1vw;
  background-color: #ff8000;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}

.submit:hover {
  background-color: #f05e16;
  transition-duration: 0.1s;
}

#waiting {
  display: none;
}

#nextPage {
  display: none;
}


</style>
  