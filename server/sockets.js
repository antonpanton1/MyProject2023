function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang, d.gameName));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('idCheck', function(pollId){
    socket.emit('idAvailable', data.idCheck(pollId))
  })

  socket.on('saveQuestions', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    io.to(d.pollId).emit('sendQuestions', data.getAllQuestions(d.pollId))
  });

  socket.on('playerReady', function(d) {
    data.ready(d.pollId);
  }
  
  )

  socket.on('calculateScore', function(d){
    data.calcScore(d.pollId, d.username, d.answer)
  })

  socket.on('getQuestions', function(pollId) {
    io.to(pollId).emit('sendQuestions', data.getAllQuestions(pollId))
  });

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
    
  });

  socket.on('getGameName', function(pollId){
   socket.emit ('gameNameUpdate', data.getgName(pollId));
   
  });

  socket.on('nextQuestion', function(pollId){
    data.nextQuestion(pollId)
  });

  socket.on('getCurrent', function(pollId){
    socket.emit('currentUpdate',data.getCurrent(pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer, d.username);
    io.to(d.pollId).emit('answerSubmitted')
  });

  socket.on('submitUsername', function(d) {
    data.submitUsername(d.pollId, d.username, d.host);
    let participants = data.getParticipants(d.pollId);
    io.to(d.pollId).emit('participantUpdate', participants);
  });

  socket.on('usernameAvailability', function(d){
    socket.emit('availability', data.checkAvailability(d.pollId, d.username));
  })

  socket.on("getAnswers", function(d){
    socket.emit('allAnswers', data.getAnswers(d.pollId, d.currentQuestion));
  })

  socket.on("getYourAnswer", function(d){
    socket.emit('YourAnswer', data.getYourAnswer(d.pollId, d.username));
  })

  socket.on('joinedLobby', function(pollId) {
    let participants = data.getParticipants(pollId);
    socket.emit('participantUpdate', participants);
  });
  
  socket.on('totalPlayers', function(pollId){
    socket.emit('totalPlayers',data.getParticipants(pollId))
  })

  socket.on('nextView', function(pollId){
    io.to(pollId).emit('nextView')
  })

  socket.on('sendToCorrectAnswer', function(pollId){
    io.to(pollId).emit('goToCorrectAnswer')
  })

  socket.on('goToLeaderboard', function(pollId){
    io.to(pollId).emit('sendToLeaderboard')
  })

  socket.on('goToQuestion', function(pollId){
    let lastQuestion = data.lastQuestion(pollId)
    if (lastQuestion){
      io.to(pollId).emit('endGame')
    }else{
      io.to(pollId).emit('sendToQuestion')
    }
  })

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });

  socket.on('hostCheck', function(d){
    socket.emit('isHost', data.hostCheck(d.pollId, d.username))
  })
  
  socket.on('joinedWaitingRoom', function(pollId) {
    let ready = data.getReady(pollId);
    io.to(pollId).emit('readyUpdate', ready)
  }); 
  
  socket.on('joinedLeaderboardView', function(pollId) {
    let topPlayers = data.updateTopPlayers(pollId);
    socket.emit('scoreboardUpdate', topPlayers)
  }); 

  socket.on('lockScores', function(pollId){
    io.to(pollId).emit('lockIn')
  })

  socket.on('joinedResultsView', function(pollId) {
    let topPlayers = data.updateTopPlayers(pollId);
    socket.emit('scoreboardUpdate', topPlayers)
  }); 
  }

export { sockets };