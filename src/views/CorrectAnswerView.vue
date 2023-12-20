<template>
<body>
    <h1>Correct Answer:</h1>
    <div class="slider">
        <div class="noll">0</div>
        <div class="line"></div>
        <div class="hundra">100</div>
    </div>
    <div class="answerSlide">
        <input type="range" id="rangeSlider" min="0" max="100" step="1" class="slider" v-model="answer">
    </div>
  </body>
</template>

<script>
import io from 'socket.io-client';
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
    name: 'WaitingRoomView',
   
    data: function () {
    return {
        
    }
    }
}
</script>

<style scoped>

body {
  background-image: linear-gradient(to bottom right, purple, pink);

  flex-direction: column;

  height: 100vh;
}

.slider {
  align-items: center;
  display: grid;
  grid-gap: 2vw;
  grid-template-columns: 20vw 20vw 20vw;
  justify-content: center;
}

.line {
    
  height: 1vh;
  width: 50vw;
  background-color: black;
  float: center;
  box-sizing: border-box;
}

.noll {

float: left;
box-sizing: border-box;
}

.hundra {

float: right;
box-sizing: border-box;
}

</style>