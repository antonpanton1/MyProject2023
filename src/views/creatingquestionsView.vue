addQuestion: function(questionNR){
    <div class="questions">
        <p>
          <label for="Question 1">
            Question 1:
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
      </div>
    }