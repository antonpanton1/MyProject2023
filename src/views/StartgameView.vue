<template>
  <div class="question-view_background">
    
    <div class="questionTitle">
      <h2>Type your questions and answers below! </h2>
    </div>    
    <div class="questions">
      <p>
        <label for="Question 1">
          Question 1:
        </label><br>
        <input type="text" id="Question 1" v-model="qu1" requeried="required" placeholder="Good questions only pls">
        {{ question1 }}
      </p>
      <p v-if= "questionNR > 0 ">
        <label for="Question 2">
          Question 2:
        </label><br>
        <input typ="text" id="Question 2" v-model="qu2" requeried="required" placeholder="Good pls">
        {{ question2 }}
      </p>
      <p v-if= "questionNR > 1 ">
        <label for="Question 3">
          Question 3:
        </label><br>
        <input typ="text" id="Question 3" v-model="qu3" requeried="required" placeholder="Good questions only pls">
        {{ question3 }}
      </p>
      <p v-if= "questionNR > 2 ">
        <label for="Question 4">
          Question 4:
        </label><br>
        <input typ="text" id="Question 4" v-model="qu4" requeried="required" placeholder="Good questions only pls">
        {{ question4 }}
      </p>
    
    </div>

    <div class="answers">  
      <p>
        <label for="Answer 1">
         Answer 1:
         </label><br>
         <input type="number" id="Answer 1" v-model="an1" required="required" placeholder="Your answer here">
         {{ answer1 }}
      </p>  
      <p v-if= "questionNR > 0 ">
        <label for="Answer 2">
         Answer 2:
         </label><br>
         <input type="number" id="Answer 2" v-model="an2" required="required" placeholder="Your answer here">
         {{ answer2 }}
      </p>  
      <p v-if= "questionNR > 1 ">
        <label for="Answer 3">
         Answer 3:
         </label><br>
         <input type="number" id="Answer 3" v-model="an3" required="required" placeholder="Your answer here">
         {{ answer3 }}
      </p>  
      <p v-if= "questionNR > 2 ">
        <label for="Answer 4">
         Answer 4:
         </label><br>
         <input type="number" id="Answer 4" v-model="an4" required="required" placeholder="Your answer here">
         {{ answer4 }}
      </p> 
    </div>

    <button type="submit" id= "add" v-on:click="questionNR++" style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #26ed58; color: #fff; border: none; cursor: pointer;width: 80px">
                  Add Question
    </button>

    <button type="submit" id= "sub" v-on:click="questionNR--" style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #af1111; color: #fff; border: none; cursor: pointer;width: 80px">
                  Remove Question
    </button>
    <div class="submit">
      <router-link class="WaitingRoomButton" :to="'/waitingroom/'" style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #ed2626; color: #fff; border: none; cursor: pointer;">Join Waiting Room</router-link>
    </div> 
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

.submit{
  text-align: center;
  margin-top: 30vh;
}
</style>
