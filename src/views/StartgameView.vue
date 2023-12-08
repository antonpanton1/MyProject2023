<template>
    <div class="question-view">
    <h1 class=" Questions">Write your Questions</h1>
    
    <!--<button class="start-button" @click="startgame"><router-link v-bind:to="'/startgame/'"> Start game</router-link></button>
        -->
    
  </div> 
</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");


</script>

<style>
.question-view {
  background-color: orange;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.questions-view {
  color: black;
  font-size: 200px;
  margin-bottom: -70px;

  margin-top: -7px;
}
</style>