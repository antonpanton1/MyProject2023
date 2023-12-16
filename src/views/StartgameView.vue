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

    <button v-if="questionNR < 3" type="submit" id= "add" v-on:click="questionNR++" style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #26ed58; color: #fff; border: none; cursor: pointer;width: 80px">
                  Add Question
    </button>

    <button v-if="questionNR > -0" type="submit" id= "sub" v-on:click="questionNR--" style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #af1111; color: #fff; border: none; cursor: pointer;width: 80px">
                  Remove Question
    </button>

    <div type="submit" class="save" v-on:click="savequestion">
      <button type="submit" v-on:click="save_question"  style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #10a428; color: #fff; border: none; cursor: pointer;">
           Save
      </button>  
    </div> 

    <div class="submit">
      <router-link class="WaitingRoomButton" :to="'/waitingroom/'+this.pollId" style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #ed2626; color: #fff; border: none; cursor: pointer;">Join Waiting Room</router-link>
    </div> 
  </div>
  
</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");


export default {
  data() {
    return {
      lang: localStorage.getItem("lang") || "en",
      pollId: "inactive poll",
      uiLabels: {},
      showMessage: true,
      questionNR: 0,
      qu1: '',
      qu2: '',
      qu3: '',
      qu4: '',
      an1: '',
      an2: '',
      an3: '',
      an4: ''

    };
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
},
  methods:{
    mounted() {
    // 3 sec timer
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  },
  save_question: function(event){
    console.log(this.qu1, this.qu2,this.qu3,this.qu4,this.an1,this.an2,this.an3,this.an4)
    socket.emit('saveQuestions', {pollId: this.pollId, q1: this.qu1, q2: this.qu2, q3: this.qu3, a1: this.an1, a2: this.an2, a3: this.an3} )
  }
  }
  
};

</script>

<style scoped>
.question-view_background {
  background-image: linear-gradient(to bottom right, red, yellow);
  /*display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;*/
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
}

.questions-Title {
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

.save{
  text-align: center;
  margin-top: 25vh;
}

.submit{
  text-align: center;
  margin-top: 5vh;
}
</style>
