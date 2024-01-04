<template>
    <div class="background">
    <div class="rectangle">

      <div class=" ins-tex">
        <h1 class="instructions-heading_one">{{ uiLabels.instructions }}</h1>

        <h2>{{ uiLabels.overview }}</h2>
            <p>{{ uiLabels.oT1 }}</p>
            <p>{{ uiLabels.oT2 }}</p>
            <p>{{ uiLabels.oT3 }}</p>
            <p>{{ uiLabels.oT4 }}</p>
            <p>{{ uiLabels.oT5 }}</p>
            <p>{{ uiLabels.oT6 }}</p>

        <h2>{{ uiLabels.how }}</h2>
    <ul>
      <p>{{ uiLabels.hT1 }}</p>
      <p>{{ uiLabels.hT2 }}</p>
      <p>{{ uiLabels.hT3 }}</p>
      <p>{{ uiLabels.hT4 }}</p>
    </ul>

        <h2>{{uiLabels.tips}}</h2>
      <p>{{ uiLabels.tT1 }}</p>
      <p>{{ uiLabels.tT2 }}</p>
      <p>{{ uiLabels.tT3 }}</p>
      <p>{{ uiLabels.tT4 }}</p>
      <p>{{ uiLabels.tT5 }}</p>

    </div>

      <div class="small-button-container">
    <router-link class="small-button" :to="'//'">{{ uiLabels.return }}</router-link><br>
    
    </div>
    
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
      height: 250%;
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
  height: 180vh;

}

.instructions-heading_one {
  font-size: 7vw;
}

.small-button-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10vh;
}

.small-button {
  text-decoration: none;
  padding: 2vw 2vw;
  font-size: 1.5em;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1vw;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #ed2626;
}

.ins-text {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10vh;
}

</style>