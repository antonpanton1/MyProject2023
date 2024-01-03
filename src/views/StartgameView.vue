<template>
  <div class="background">
    <p class="gameCode"> {{uiLabels.currentGame}} {{ pollId }}</p>
      <div>
        <h2> {{uiLabels.title}}</h2>
      </div>
    
    <div class="centering">
       <div class="mediaContainer">

      <div id="questionField">
      <div id="questions">  
      <p>
        <label for="Question1">
          {{uiLabels.Question1}}
        </label><br>
        <input typ="text" id="Question1" v-model="qu1" requeried="required" placeholder={{uiLabels.typequestion}} style="width:300px;">
        {{ question1 }}
      </p>
      <p v-if= "questionNR > 0 ">
        <label for="Question2">
          {{uiLabels.Question2}}
        </label><br>
        <input typ="text" id="Question2" v-model="qu2" requeried="required" placeholder="Good questions only pls" style="width:300px;">
        {{ question2 }}
      </p>    
      <p v-if= "questionNR > 1 ">
        <label for="Question3">
          {{uiLabels.Question3}}
        </label><br>
        <input typ="text" id="Question3" v-model="qu3" requeried="required" placeholder="Good questions only pls" style="width:300px;">
        {{ question3 }}
      </p>  
    </div>
    </div>

    <div id="answerField">
    <div class="answers">  
      <p>
        <label for="Answer 1">
          {{uiLabels.Answer1}}
         </label><br>
         <input type="number" id="Answer1" v-model="an1" required="required" placeholder="Your answer here">
         {{ answer1 }}
      </p>  
      <p v-if= "questionNR > 0 ">
        <label for="Answer 2">
          {{uiLabels.Answer2}}
         </label><br>
         <input type="number" id="Answer2" v-model="an2" required="required" placeholder= {{uiLables.typeanswer}}>
         {{ answer2 }}
      </p> 
      <p v-if= "questionNR > 1 ">
        <label for="Answer 3">
          {{uiLabels.Answer3}}
         </label><br>
         <input type="number" id="Answer3" v-model="an3" required="required" placeholder= {{uiLables.typeanswer}}>
         {{ answer3 }}
      </p> 
    </div>
    </div>


    <button class="addQuestionButton" v-if="questionNR < 2" type="submit" v-on:click="questionNR++">
        {{uiLabels.addquestion}}
    </button>

    <button class="removeQuestionButton" v-if="questionNR > -0" type="submit" v-on:click="removefunc">
        {{uiLabels.removequestion}}
    </button>



    <!--<div type="submit" class="save" v-on:click="savequestion">
      <button type="submit" v-on:click="save_question"  style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #10a428; color: #fff; border: none; cursor: pointer;">
           Save
      </button>  
    </div> -->

    <div type="submit" class="wrap">
    <button id="submit" type="submit" v-on:click="joinGame" :disabled="!areAllQuestionsAndAnswersFilled">
            {{uiLabels.joinwaitroom}}
    </button>
    </div>
    
  
    </div> 
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
      username: "",
      showMessage: true,
      questionNR: 0,
      qu1: '',
      qu2: '',
      qu3: '',
      an1: '',
      an2: '',
      an3: ''

    };
  },

  computed: {
    areAllQuestionsAndAnswersFilled() {
      // Check if all questions and answers are filled in
      return (
        this.qu1 !== '' &&
        this.an1 !== '' &&
        (this.questionNR < 1 ||
          (this.qu2 !== '' && this.an2 !== '' && (this.questionNR < 2 || (this.qu3 !== '' && this.an3 !== ''))))
      );
    },
  },

  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.uid
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);    
    

  },
 
  methods:{

    mounted() {
    // 3 sec timer
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  },
  removefunc: function(){
    
      if (this.questionNR === 1) {
        // If removing the second question
        this.qu2 = '';
        this.an2 = '';
      } else if (this.questionNR === 2) {
        // If removing the third question
        this.qu3 = '';
        this.an3 = '';
      }
      this.questionNR--;
  },
  
  joinGame: function() {
    socket.emit('saveQuestions', {pollId: this.pollId, q1: this.qu1, q2: this.qu2, q3: this.qu3, a1: this.an1, a2: this.an2, a3: this.an3} )
    this.$router.push({ path: '/waitingroom/'+this.pollId+"/"+this.username})
  }
  }
  
};

</script>

<style scoped>
.background {
    background-image: linear-gradient(to bottom right, red, yellow);
    height: 100vh;
    overflow: hidden;
}
.centering {
  /*display: flex;
   flex-direction: column;
  justify-content: center;
  align-items: center; 
  padding: 0 2vw;*/
}
.mediaContainer {
  /* display: flex;
  flex-direction: column;
  gap: 10%; */
}
#row {
  display: flex;
  justify-content: space-between;
  gap: 3vw;
  justify-content: center;
  margin-bottom: 2%;
}
#questionField {
  width: 45%;
  box-sizing: border-box;
  padding: 2vw;
  float:left;
}
#answerField {
  width: 45%;
  box-sizing: border-box;
  padding: 2vw;
  float:right;
}

/* .answers{
  width: 50%;
  box-sizing: border-box;
  float:right;
}

.questions{
  width: 50%;
  box-sizing: border-box;
  float:left;
} */

.joinWaitingRoomButton {
  display: flex;
  box-sizing: border-box;
  background-color:#F05E16 ;
  padding: 2vw;
  text-align: center;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
}
.addQuestionButton {
  display: flex;
  box-sizing: border-box;
  padding: 2vw;
  background-color: green;
  color: white;
  border: none;
  border-radius: 1vw;
  align-items: center;
  justify-content: center;
  cursor: pointer
}
.removeQuestionButton {
  display: flex;
  box-sizing: border-box;
  padding: 2vw;
  background-color: red;
  color: white;
  border: none;
  border-radius: 1vw;
  align-items: center;
  justify-content: center;
  cursor: pointer
  
  
}
.gameCode{
    text-align: left;
    margin-left: 1vw;
    margin-top: 1vw;
}

</style>