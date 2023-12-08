<template>
    <h1>You're here!!</h1>

    Display: {{ testText }} 
</template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");

export default{
    name: 'test',
    data: function () {
    return {
      testText: '' // Initialize testText as an empty string
    };
  },
  created: function () {
  socket.on('testEmit', (text) => {
    this.testText = text.text; // Update testText with data received from socket
    console.log("testText updated:", this.testText);
  });
}
};

</script>