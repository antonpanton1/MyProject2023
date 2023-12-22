<template>
  <div class="question-view_background">
    
    <div class="questionTitle">
      <h2> {{uiLabels.title}} </h2>
    </div>    
    <div class="questions">
      <p>
        <label for="Question 1">
          {{uiLabels.Question1}}
        </label><br>
        <input type="text" id="Question 1" v-model="qu1" requeried="required" placeholder='uiLabels.typequestion' style="width:300px;">
        {{ question1 }}
      </p>
      <p v-if= "questionNR > 0 ">
        <label for="Question 2">
          {{uiLabels.Question2}}
        </label><br>
        <input typ="text" id="Question 2" v-model="qu2" requeried="required" placeholder={{uiLabels.typequestion}} style="width:300px;">
        {{ question2 }}
      </p>
      <p v-if= "questionNR > 1 ">
        <label for="Question 3">
          {{uiLabels.Question3}}
        </label><br>
        <input typ="text" id="Question 3" v-model="qu3" requeried="required" placeholder={{uiLabels.typequestion}} style="width:300px;">
        {{ question3 }}
      </p>    
    </div>

    <div class="answers">  
      <p>
        <label for="Answer 1">
          {{uiLabels.Answer1}}
         </label><br>
         <input type="number" id="Answer 1" v-model="an1" required="required" placeholder= {{uiLables.typeanswer}}>
         {{ answer1 }}
      </p>  
      <p v-if= "questionNR > 0 ">
        <label for="Answer 2">
          {{uiLabels.Answer2}}
         </label><br>
         <input type="number" id="Answer 2" v-model="an2" required="required" placeholder= {{uiLables.typeanswer}}>
         {{ answer2 }}
      </p>  
      <p v-if= "questionNR > 1 ">
        <label for="Answer 3">
          {{uiLabels.Answer3}}
         </label><br>
         <input type="number" id="Answer 3" v-model="an3" required="required" placeholder= "{{uiLables.typeanswer}}">
         {{ answer3 }}
      </p>  
    </div>
    <div type="submit" class="plusmin">
    <button v-if="questionNR < 2" type="submit" id= "add" v-on:click="questionNR++" style="background-color: #26ed58;">
          {{uiLabels.addquestion}}
    </button>
  </div>
    <button v-if="questionNR > -0" type="submit" id= "sub" v-on:click="questionNR--" style="background-color: #af1111;">
          {{uiLabels.removequestion}}
    </button>

    <!--<div type="submit" class="save" v-on:click="savequestion">
      <button type="submit" v-on:click="save_question"  style="text-decoration: none; color: inherit; display: inline-block; padding: 10px; background-color: #10a428; color: #fff; border: none; cursor: pointer;">
           Save
      </button>  
    </div> -->
    <div type="submit" class="wrap">
    <button class="submit" v-on:click="joinGame" v-bind:disabled="!areAllFieldsFilled">
            {{uiLabels.joinwaitroom}}
    </button>
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
  created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.uid
    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
},
  methods:{
    computed: {
  areAllFieldsFilled() {
    return (
      this.qu1 !== '' &&
      this.qu2 !== '' &&
      this.qu3 !== '' &&
      this.an1 !== '' &&
      this.an2 !== '' &&
      this.an3 !== ''
    );
  },
},
    mounted() {
    // 3 sec timer
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  },
  save_question: function(event){
    //console.log(this.qu1, this.qu2,this.qu3,this.qu4,this.an1,this.an2,this.an3,this.an4)
    socket.emit('saveQuestions', {pollId: this.pollId, q1: this.qu1, q2: this.qu2, q3: this.qu3, a1: this.an1, a2: this.an2, a3: this.an3} )
  },
  joinGame: function() {
    socket.emit("joinedWaitingRoom", pollId)
    this.$router.push({ path: '/waitingroom/'+this.pollId+"/"+this.username})
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

.plusmin{
  text-decoration: none; 
  color: inherit; 
  display: inline-block; 
  padding: 10px; 
  color: #fff; 
  border: none; 
  cursor: pointer;
  width: 140px;
  height: 50px;
}

.wrap{
  text-align: center;
  margin-top: 1vh;
}

.submit{
  text-align: center;
  margin-top: 5vh;
  text-decoration: none;
  color: inherit;
  display: inline-block;
  padding: 10px; 
  background-color: #ed2626; 
  color: #fff; 
  border: none; 
  cursor: pointer;
}
</style>
