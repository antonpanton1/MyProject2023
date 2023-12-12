<template>
<div class="CorrectAnswerViewbackground">
    <h1>Correct Answer:</h1>
    <div class="slider">
        <div class="noll"> 0 </div>
        <div class="line"> </div>
        <div class="hundra"> 100 </div>
    </div>
</div>
</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

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

<style>

.CorrectAnswerViewbackground {
  background-image: linear-gradient(to bottom right, purple, pink);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.slider {
display: grid;
grid-gap: 2vw;
grid-template-columns: 30vw 20vw 60vw;
}

.line {
    
  height: 5px;
  width: 50vw;
  background-color: black
  ;
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