<template>
  <div class="background">
    <p class="gameCode"> {{uiLabels.currentGame}} {{ pollId }}</p>
      <div>
        <h2> {{uiLabels.title}}</h2>
      </div>
   
    <div class="centering">
       <div class="mediaContainer">


      <div class="inputWrap">  
      <div id="questionField">
      <p>
        <label for="Question1">
          {{uiLabels.Question1}}
        </label><br>
        <input typ="text" id="Question1" v-model="question1" requeried="required" :placeholder="uiLabels.typeQuestion">
        
      </p>
      <p v-if= "questionNR > 0 ">
        <label for="Question2">
          {{uiLabels.Question2}}
        </label><br>
        <input typ="text" id="Question2" v-model="question2" requeried="required" :placeholder="uiLabels.typeQuestion">
      </p>    
      <p v-if= "questionNR > 1 ">
        <label for="Question3">
          {{uiLabels.Question3}}
        </label><br>
        <input typ="text" id="Question3" v-model="question3" requeried="required" :placeholder="uiLabels.typeQuestion">
      </p>  
    </div>
    
    <div id="answerField">
      <p>
        <label for="Answer 1">
          {{ uiLabels.Answer1 }}
         </label><br>
         <input type="number" id="Answer1" v-model="answer1" required="required" :placeholder="uiLabels.typeAnswer" max="100">
      </p>  
      <p v-if= "questionNR > 0 ">
        <label for="Answer 2">
          {{uiLabels.Answer2}}
         </label><br>
         <input type="number" id="Answer2" v-model="answer2" required="required" :placeholder="uiLabels.typeAnswer" max="100">
      </p>
      <p v-if= "questionNR > 1 ">
        <label for="Answer 3">
          {{uiLabels.Answer3}}
         </label><br>
         <input type="number" id="Answer3" v-model="answer3" required="required" :placeholder="uiLabels.typeAnswer" max="100">
      </p>
    </div>
  </div>
    </div>
  </div>
  <div id="buttonsthing">
  <button class="addQuestionButton" v-if="questionNR < 2" type="submit" v-on:click="questionNR++">
        {{uiLabels.addquestion}}
    </button>


    <button class="removeQuestionButton" v-if="questionNR > -0" type="submit" v-on:click="removefunc">
        {{uiLabels.removequestion}}
    </button>
  </div>
  <div id="joinbutton">
    <button class="joinWaitingRoomButton" type="submit" v-on:click="questionMark" :disabled="!areAllQuestionsAndAnswersFilled">
            {{uiLabels.joinwaitroom}}
    </button>
  </div>
  <div>
    <label v-if="!areAllQuestionsAndAnswersFilled">
      {{ uiLabels.notValid }}
    </label>
  </div>
  
  </div>
</template>


<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
  data() {
    return {
      lang: localStorage.getItem("lang") || "en",
      pollId: "inactive poll",
      uiLabels: {},
      username: "",
      showMessage: true,
      questionNR: 0,
      question1: '',
      question2: '',
      question3: '',
      answer1: '',
      answer2: '',
      answer3: ''
    };
  },


  computed: {
    areAllQuestionsAndAnswersFilled() {
      // Check if all questions and answers are filled in
      return (
        this.question1 !== '' &&
        this.answer1 !== '' &&
        this.answer1 <= 100 &&
        this.answer2 <= 100 &&
        this.answer3 <= 100 &&
        this.answer1 >= 0 &&
        this.answer2 >= 0 &&
        this.answer3 >= 0 &&
        
        
        (this.questionNR < 1 ||
          (this.question2 !== '' && this.answer2 !== '' && (this.questionNR < 2 || (this.question3 !== '' && this.answer3 !== ''))))
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
    questionMark: function(){
      // Kontrollera om ett frågetecken finns i något av frågefälten
      
      if (this.question1.includes('?') ) {
        this.question1 = this.question1.replace('?', '');
      } else {
    
      }
      if (this.question2.includes('?') ) {
        this.question2 = this.question2.replace('?', '');
      } else {
        
      }
      if (this.question3.includes('?') ) {
        this.question3 = this.question3.replace('?', '');
      } else {
        
      }
      this.joinGame();
    },
  removefunc: function(){
   
      if (this.questionNR === 1) {
        // If removing the second question
        this.question2 = '';
        this.answer2 = '';
      } else if (this.questionNR === 2) {
        // If removing the third question
        this.question3 = '';
        this.answer3 = '';
      }
      this.questionNR--;
  },
  
 

 
  joinGame: function() {
 
   
    socket.emit('saveQuestions', {pollId: this.pollId, q: this.question1, a: this.answer1})
    console.log("första frågan skickas")
    socket.emit('playerReady', {pollId: this.pollId})
    console.log("knapp tryckt")
    if (this.question2 !== ''){
      socket.emit('saveQuestions', {pollId: this.pollId, q: this.question2, a: this.answer2})
      console.log("andra frågan skickas")  
    }
    if (this.question3 !== ''){
      socket.emit('saveQuestions', {pollId: this.pollId, q: this.question3, a: this.answer3})
      console.log("tredje frågan skickas")  
    }
    
    this.$router.push({ path: '/waitingroom/'+this.pollId+"/"+this.username})
  },
  }
};
</script>



<style scoped>
.background {
    background-image: linear-gradient(to bottom right, red, yellow);
    height: 100vh;
    overflow: scroll;
}
 .centering {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2vw;
}
 .mediaContainer {
  display: flex;
  flex-direction: column;
  gap: 10%;
}
#buttonsthing{
  display:flex;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  gap: 5%;
}
#joinbutton{
  display:flex;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
}
.inputWrap{
  width: 100%;
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
.joinWaitingRoomButton {
  display: flex;
  box-sizing: border-box;
  text-align: center;
  margin: 20px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 2vh 2vw;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  background-color: #ff8000;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}
.joinWaitingRoomButton:hover {
  background-color: #f05e16;
}
.addQuestionButton {
 
  display: flex;
  box-sizing: border-box;
  text-align: center;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 2vh;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  background-color: green;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}
.addQuestionButton:hover {
  background-color:rgb(0, 110, 0);
}
.removeQuestionButton {
  display: flex;
  box-sizing: border-box;
  text-align: center;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 2vh;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  background-color: red;
  box-shadow: -2px 4px 6px rgb(0, 0, 0, 0.1);
}
.removeQuestionButton:hover {
  background-color:#db0700;
}


.wrap{
  margin-bottom: 500px;
}
.gameCode{
    text-align: left;
    margin-left: 1vw;
    margin-top: 1vw;
}


#Answer3,#Answer2,#Answer1,#Question1,#Question2,#Question3{
  height: 4vw;
  border-radius:0.5rem;
  font-size: 2.5vw;
}


</style>