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
        <input typ="text" id="Question1" v-model="qu1" requeried="required" :placeholder="uiLabels.typeQuestion" style="width:300px;">
        {{ question1 }}
      </p>
      <p v-if= "questionNR > 0 ">
        <label for="Question2">
          {{uiLabels.Question2}}
        </label><br>
        <input typ="text" id="Question2" v-model="qu2" requeried="required" :placeholder="uiLabels.typeQuestion" style="width:300px;">
        {{ question2 }}
      </p>    
      <p v-if= "questionNR > 1 ">
        <label for="Question3">
          {{uiLabels.Question3}}
        </label><br>
        <input typ="text" id="Question3" v-model="qu3" requeried="required" :placeholder="uiLabels.typeQuestion" style="width:300px;">
        {{ question3 }}
      </p>  
    </div>


    <div id="answerField">
      <p>
        <label for="Answer 1">
          {{ uiLabels.Answer1 }}
         </label><br>
         <input type="number" id="Answer1" v-model="an1" required="required" :placeholder="uiLabels.typeAnswer" max="100">
         {{ answer1 }}
      </p>  
      <p v-if= "questionNR > 0 ">
        <label for="Answer 2">
          {{uiLabels.Answer2}}
         </label><br>
         <input type="number" id="Answer2" v-model="an2" required="required" :placeholder="uiLabels.typeAnswer" max="100">
         {{ answer2 }}
      </p>
      <p v-if= "questionNR > 1 ">
        <label for="Answer 3">
          {{uiLabels.Answer3}}
         </label><br>
         <input type="number" id="Answer3" v-model="an3" required="required" :placeholder="uiLabels.typeAnswer" max="100">
         {{ answer3 }}
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
    <button id="joinWaitingRoomButton" type="submit" v-on:click="questionMark" :disabled="!areAllQuestionsAndAnswersFilled">
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
        this.an1 <= 100 &&
        this.an2 <= 100 &&
        this.an3 <= 100 &&
        this.an1 >= 0 &&
        this.an2 >= 0 &&
        this.an3 >= 0 &&
        
        
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

    questionMark: function(){
      // Kontrollera om ett frågetecken finns i något av frågefälten
      
      if (this.qu1.includes('?') ) {
        this.qu1 = this.qu1.replace('?', '');
      } else {
    
      }
      if (this.qu2.includes('?') ) {
        this.qu2 = this.qu2.replace('?', '');
      } else {
        
      }
      if (this.qu3.includes('?') ) {
        this.qu3 = this.qu3.replace('?', '');
      } else {
        
      }
      this.joinGame();
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
 
   
    socket.emit('saveQuestions', {pollId: this.pollId, q: this.qu1, a: this.an1})
    console.log("första frågan skickas")
    socket.emit('playerReady', {pollId: this.pollId})
    console.log("knapp tryckt")
    if (this.qu2 !== ''){
      socket.emit('saveQuestions', {pollId: this.pollId, q: this.qu2, a: this.an2})
      console.log("andra frågan skickas")  
    }
    if (this.qu3 !== ''){
      socket.emit('saveQuestions', {pollId: this.pollId, q: this.qu3, a: this.an3})
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
    overflow: hidden;
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


#row {
  display: flex;
  justify-content: space-between;
  gap: 3vw;
  justify-content: center;
  margin-bottom: 2%;
}


#buttonsthing{
  display:flex;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
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






.addQuestionButton,
.removeQuestionButton,
#joinWaitingRoomButton {
  margin-top: 20px;  
 
}


#joinWaitingRoomButton {
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
  margin-top: 15px;
  justify-content: center;
  align-items: center;
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
  cursor: pointer;
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