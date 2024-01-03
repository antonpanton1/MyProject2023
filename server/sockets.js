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
    console.log("begun idcheck for: ", pollId)
    socket.emit('idAvailable', data.idCheck(pollId))
  })

  socket.on('saveQuestions', function(d) {
    data.addQuestion(d.pollId, {q: d.q1, a: d.a1});
    data.addQuestion(d.pollId, {q: d.q2, a: d.a2});
    data.addQuestion(d.pollId, {q: d.q3, a: d.a3});
    data.ready(d.pollId);
    io.to(d.pollId).emit('sendQuestions', data.getAllQuestions(d.pollId))
  });

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
    console.log('Kom till getname', pollId)
   socket.emit ('gameNameUpdate', data.getgName(pollId));
   
  });

  socket.on('nextQuestion', function(pollId){
    data.nextQuestion(pollId)
  });

  socket.on('getCurrent', function(pollId){
    if(data.lastQuestion(pollId)) {
      socket.emit('endGame')
    }
    else {socket.emit('currentUpdate',data.getCurrent(pollId));
  }});

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer, d.username);
    /* io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId)); */
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

  socket.on('joinedLobby', function(pollId) {
    let participants = data.getParticipants(pollId);
    socket.emit('participantUpdate', participants);
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });
  
  socket.on('joinedWaitingRoom', function(pollId) {
    let ready = data.getReady(pollId);
    socket.emit('readyUpdate', ready)
  }); 
  
  socket.on('joinedLeaderboardView', function(pollId) {
    let topPlayers = data.updateTopPlayers(pollId);
    socket.emit('scoreboardUpdate', topPlayers)
  }); 
  }

export { sockets };