<template>
    <div class="input-group">
      <input
        id="btn-input"
        type="text"
        name="message"
        class="form-control input-sm"
        placeholder="Type your message here..."
        v-model="newMessage"
        @keyup.enter="addMessage"
      />
      <span class="input-group-btn">
        <button class="btn btn-primary btn-sm" id="btn-chat" @click="addMessage">
          Send
        </button>
      </span>
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    props: ["user"],
    data() {
      return {
        newMessage: "",
        message:[]
      };
    },
    methods: {
    //   sendMessage() {
    //     this.$emit("messagesent", {
    //       user: this.user,
    //       message: this.newMessage,
    //     });
    //     this.newMessage = "";
    //   },

      fetchMessages() {
            axios.get('http://127.0.0.1:8000/messages').then(response => {
                this.messages = response.data;
            });
        },
        addMessage() {
            debugger;
            let formData = {};
            formData['message']=this.newMessage;
            let urlText = 'messages';
            formData['id']=1;
            let postResponse = this.post(urlText, formData);
            debugger;
        }
    },
  };
  </script>