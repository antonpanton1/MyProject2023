<template>
  <div class="question-view_background">
    <h1 v-if="showMessage" class="questions-view">you are the</h1> <br>
    <div v-if="showMessage" class="text-container">
      <h1 class="blacktext">main</h1>
      <h1 class="plaintext">character.</h1>
    </div>

    <div class="questionTitle">
      <h2>Type your questions and answers bellow! </h2>
    </div>    
    <div class="questions">
      <p>
        <label for="Question 1">
          Question 1:
        </label><br>
        <input typ="text" id="Question 1" v-model="question1" requeried="required" placeholder="Good questions only pls">
        {{ question1 }}
      </p>
      <p v-if= "questionNR > 0 ">
        <label for="Question 2">
          Question 2:
        </label><br>
        <input typ="text" id="Question 1" v-model="question1" requeried="required" placeholder="Good questions only pls">
        {{ question1 }}
      </p>
      <p v-if= "questionNR > 1 ">
        <label for="Question 3">
          Question 3:
        </label><br>
        <input typ="text" id="Question 1" v-model="question1" requeried="required" placeholder="Good questions only pls">
        {{ question1 }}
      </p>
    
    </div>

    <div class="answers">  
      <p>
        <label for="Answer 1">
         Answer 1:
         </label><br>
         <input type="number" id="Answer 1" v-model="answer1" required="required" placeholder="Your answer here">
         {{ answer1 }}
      </p>  
      <p v-if= "questionNR > 0 ">
        <label for="Answer 2">
         Answer 2:
         </label><br>
         <input type="number" id="Answer 1" v-model="answer1" required="required" placeholder="Your answer here">
         {{ answer1 }}
      </p>  
      <p v-if= "questionNR > 1 ">
        <label for="Answer 2">
         Answer 3:
         </label><br>
         <input type="number" id="Answer 1" v-model="answer1" required="required" placeholder="Your answer here">
         {{ answer1 }}
      </p>  

    </div>

    <button type="submit" id= "add" v-on:click="questionNR++" style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #26ed58; color: #fff; border: none; cursor: pointer;width: 80px">
                  Add question
    </button>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");


export default {
  data() {
    return {
      showMessage: true,
      questionNR: 0
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
  /*display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;*/
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

.questions{
  width: 50%;
  box-sizing: border-box;
  float: left;

}

.answers{
  width: 50%;
  box-sizing: border-box;
  float: right;

}
</style>
