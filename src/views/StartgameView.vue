<template>
  <div class="question-view_background">
    <h1 v-if="showMessage" class="questions-view">you are the</h1> <br>
    <div v-if="showMessage" class="text-container">
      <h1 class="blacktext">main</h1>
      <h1 class="plaintext">character.</h1>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  data() {
    return {
      showMessage: true
    };
  },
  mounted() {
    // 3 sec timer
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
};
</script>

<style>
.question-view_background {
  background-image: linear-gradient(to bottom right, red, yellow);
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

.text-container {
  display: flex;
  align-items: baseline;
}

.blacktext {
  color: white;
  font-size: 200px;
  margin-bottom: -70px;
  margin-top: -7px;
  margin-right: 60px;
}

.plaintext {
  color: black;
  font-size: 200px;
  margin-bottom: -70px;
  margin-top: -7px;
}
</style>
