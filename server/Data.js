'use strict';
const languages = ["en", "se"];
import {readFileSync} from "fs";

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
  this.polls['test'] = {
    lang: "en",
    questions: [
      {q: "fråga 1?",
      a: 44}
    ],
    answers: [],
    gName: "Test spelet",
    currentQuestion: 0,
    ready: 0,
    participants: {}
  } 
}

/**********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const labels = readFileSync("./server/data/labels-" + lang + ".json");
  return JSON.parse(labels);
}

Data.prototype.createPoll = function(pollId, lang="en", gameName) {
  if (typeof this.polls[pollId] === "undefined") {   
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;
    poll.participants = {};  
    poll.gName = gameName;     
    poll.ready = 0;       
    this.polls[pollId] = poll;
  }
  return this.polls[pollId];
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.getYourAnswer = function(pollId, username) {
  const poll = this.polls[pollId];
  const participant = poll.participants[username];
  if (typeof poll !== 'undefined') {
    return participant.answers[poll.currentQuestion]
  }
  return 0
}

Data.prototype.ready = function(pollId){
  const poll = this.polls[pollId];
  if(typeof poll !== 'undefined'){
    poll.ready +=1;
  }
}

Data.prototype.getReady = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    return poll.ready;
  }
  return []
}

Data.prototype.calcScore = function(pollId, username, answer){
  const poll = this.polls[pollId];
  if (typeof poll !== "undefined"){
    const participant = poll.participants[username];
    if(typeof participant !== "undefined"){
      var score = Math.abs(poll.questions[poll.currentQuestion].a - answer)
      if (score == 0){
        var score = -10;
      } 
      participant.score += score
    }
    
  }
}

Data.prototype.updateTopPlayers = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== "undefined"){
    const userScores = Object.entries(poll.participants).map(([username, data]) => ({username, score: data.score,}));
    userScores.sort((a, b) => a.score - b.score);
    return userScores.slice(0,5);   
  }
  return []
}

Data.prototype.getParticipants = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    return Object.keys(poll.participants);
  }
  return []
}

Data.prototype.getgName = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    return poll.gName;
  }
  return ''
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.getAllQuestions = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {  
    return poll.questions;
  }
  return []
}
 
Data.prototype.submitUsername = function(pollId, username, host){
  const poll = this.polls[pollId];
  if (typeof poll !== "undefined"){
    if (!poll.participants[username]) {
      poll.participants[username] = { answers: [], score: 0, host: host};
    } 
  }
}

Data.prototype.checkAvailability = function(pollId, username){
  const poll = this.polls[pollId];
  if (poll && poll.participants && poll.participants[username]) {
    return false; 
  }
  return true
}

Data.prototype.nextQuestion = function(pollId){
  const poll = this.polls[pollId];
  if(typeof poll !== 'undefined'){
    poll.currentQuestion += 1;
  }
} 

Data.prototype.lastQuestion = function(pollId) {
  const poll = this.polls[pollId];
  if(typeof poll !== 'undefined' && poll.currentQuestion >= poll.questions.length) {
    return true
  }
  return false
}

Data.prototype.getCurrent = function(pollId){
  const poll = this.polls[pollId];
  if(typeof poll !== 'undefined'){
    return poll.currentQuestion
  }
  return 0
}

Data.prototype.idCheck = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    return true
  }
  else return false
}

Data.prototype.submitAnswer = function(pollId, answer, username) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const participant = poll.participants[username];
    if(typeof participant !== 'undefined'){
      participant.answers.push(answer)
    }
  }
}

 Data.prototype.hostCheck = function(pollId, username) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const participant = poll.participants[username];
    if(typeof participant !== 'undefined'){
      return participant.host === true;
    }
   
  }
  return false
} 

Data.prototype.getAnswers = function(pollId, currentQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const participant = Object.values(poll.participants)
    if(typeof participant !== "undefined"){
      const answers = participant.reduce((acc, participant) => { 
        return acc.concat(participant.answers[poll.currentQuestion]);
      }, [] );
      return answers
    }
    }
  return []
}
export { Data };



