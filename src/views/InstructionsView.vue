<template>
    <div class="background">
    <div class="rectangle">
        <h1 class="instructions-heading_one">Instructions</h1>
        
        <header>
            <h1>Game Instructions test</h1>
        </header>

        <h2>Overview</h2>
            <p>Welcome to the game! Follow these instructions to get started.</p>
        <h2>How to Play</h2>
    <ul>
      <h>Step 1: Write three qustions with an answer between 0 to 100 Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h> <br>
      <h>Step 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h> <br>
      <h>Step 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</h>
    </ul>

    <h2>Tips</h2>
    <ul>
      <h>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h> <br>
      <h>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h>
    </ul>
    </div>

</div>
    

</template>

<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));


</script>

<style scoped>

.rectangle {

      width: 90%;
      height: 800px;
      background-color: #ffffff8b;
      border-radius: 20px; /* rounded corners */
      margin: 30px auto 0; /* margin top, content centered, 0 for sides */
    }

.instructions-heading_one {
    margin: 10px auto 0;
    font-size: 100px;
    color: black


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
</style>