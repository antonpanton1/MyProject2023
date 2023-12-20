<template>

   <div class="start-view">
      <h1 class="game-title">Leaderboard: </h1>
  
    <div class="users">
        <h2>Namn: </h2>
        <!--lista med allas username-->
    </div>
     
    <div class="points">
      <h2>Poäng: </h2>
      <!--lista med allas poäng-->
    </div>
    <img src= "https://banner2.cleanpng.com/20180422/qxw/kisspng-gold-medal-olympic-medal-clip-art-honors-5adc14f33dc5a6.4712063515243727232531.jpg" alt="Span" title = "Another in-line element" style="width: 200px;">
</div> 
</template>


<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
    name: 'WaitingRoomView',
   
    data: function () {
    return {
        pollId: "inactive poll",
        userName: [],
        uiLabels: {},
        lang: localStorage.getItem("lang") || "en",
        participants: [],
        };
    },
    created: function () {
    this.pollId = this.$route.params.id
    this.username = this.$route.params.uid
    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels

    });
    },
    methods: {

    }


  }
</script>

<style scoped>
.start-view {
  background-image: linear-gradient(to bottom right, red, yellow);
  color: rgb(28, 28, 28);
  /*display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;*/
  height: 100vh;
}

.game-title {
  color: black;
  font-size: 50px;
  margin-bottom: 00px;
  position: center;
  margin-top: -7px;
}

.users{
  width: 50%;
  box-sizing: border-box;
  float: left;
  margin-bottom: 350px;
}
.points{
  width: 50%;
  box-sizing: border-box;
  float: right;
  margin-bottom: 350px;
}

</style>