<template>
    <div class="background">
    <div class="rectangle">
        <h1 class="instructions-heading_one">{{ uiLabels.instructions }}</h1>

        <h2>{{ uiLabels.overview }}</h2>
            <p>{{ uiLabels.overviewText }}</p>
        <h2>{{ uiLabels.how }}</h2>
    <ul>
      <h>{{ uiLabels.howText }}</h> <br>
    </ul>

        <h2>Tips</h2>
      <p>{{ uiLabels.tipsText }}</p>
    </div>

</div>
    

</template>

<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
    name: 'CreateLobby',
    data: function () {
      return {
        lang: localStorage.getItem("lang") || "en",
        pollId: "inactive poll",
        uiLabels: {},
        question: "",
        answers: ["", ""],
        questionNumber: 0,
        data: {},
        gameName: "",
    
      };
    },
    created: function () {  
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
      socket.on("dataUpdate", (data) =>
        this.data = data
      ) 
      socket.emit("pageLoaded", this.lang);
    },
  };

</script>

<style scoped>

.rectangle {

      width: 90%;
      height: 90vh;
      background-color: #ffffff8b;
      border-radius: 1vw; /* rounded corners */
      margin: 0.1vh auto 0; /* margin top, content centered, 0 for sides */
      padding: 2vw;
    }

.instructions-heading_one {
    margin: 10px auto 0;
    font-size: 100px;
    color: black


}
ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
body {
    font-family: Arial, Helvetica, sans-serif;
    }

.background {
  background-image: linear-gradient(to bottom right, red, yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.instructions-heading_one {
  font-size: 7vw;
}
</style>