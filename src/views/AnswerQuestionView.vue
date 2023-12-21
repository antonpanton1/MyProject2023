<template>
  <body>
      <h1>Question:</h1>
      <br>
      <h2>{{this.questions[currentQuestion].q}}?</h2>
      <br>
      <button id="minus"  class="answer" v-on:click="decrease">-</button>
      <input  id="number" type="number" min="0" max="100" step="1" for="rangeSlider" class="sliderValue" v-model="answer"  >         
      <button id="plus" class="answer" v-on:click="increase">+</button>
      <div class="answerSlide">
          <input type="range" id="rangeSlider" min="0" max="100" step="1" class="slider" v-model="answer">
      </div>
      <button class="submit" id="lockBtn" v-on:click="lockAnswer"> Lock in answer </button>
      <p id="waiting" >Waiting for other players</p>

  </body>
</template>
  
<script>
import io from 'socket.io-client';
import { queuePostFlushCb } from 'vue';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: localStorage.getItem("lang") || "en",
      pollId: "",
      questions: [],
      answer: 50,
      username: "",
      currentQuestion: 0,
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.uid
    socket.emit('joinPoll', this.pollId);
    socket.emit('getCurrent', this.pollId)
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    });
    socket.on("dataUpdate", (data) =>
      this.data = data
    );
    socket.emit("getQuestions", this.pollId);

    socket.on("sendQuestions", (questions) => 
      this.questions = questions,
    );

    socket.on('currentUpdate', (current) => 
      this.currentQuestion = current
    );
  },
  methods: {
      increase: function(){
          this.answer ++;
      },
      decrease: function(){
          this.answer --;
      },
      lockAnswer: function(){
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

        socket.emit("submitAnswer", {pollId: this.pollId, username: this.username, answer: this.answer})
        socket.emit('calculateScore', {pollId: this.pollId, username: this.username, answer: this.answer})
      }
  }
}
</script>
  
<style scoped>
body {
    background-image: linear-gradient(to bottom right, red, yellow);
    flex-direction: column;
    height: 100vh
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
  padding: 3%;
  text-align: center;
  font-size: 24px;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;
}

.answer {
    background-color:#F05E16 ;
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
    color: black;
}

.answerSlide {
    width: 100%;
}

.slider {
    width: 50%;
    background: rgb(255, 196, 100) ;
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
    background-color:#F05E16 ;
    margin: 20px;
    padding: 3%;
    text-align: center;
    font-size: 24px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
}

.submit:hover {
    color: black;
    background-color: darkorange;
    transition-duration: 0.1s;

}

#waiting {
  display: none;
}


</style>
  