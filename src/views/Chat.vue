<template>
    <Chat :mode="mode" />
 </template>
 
 <script>
 import Chat from '../components/chat/ChatForm.vue';
 export default {
   data() {
     return {
      mode:'add'
     };
   },
   components:{
     Chat
   }
 };
 </script>
 