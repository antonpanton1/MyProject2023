<template>
    <button v-on:click="startPoll">Start Poll</button>
    </template>

<script>
import io from 'socket.io-client';
const socket = io("localhost:3000");


</script>