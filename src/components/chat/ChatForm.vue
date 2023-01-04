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
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },
        addMessage() {
            let formData = {};
            formData['message']=this.newMessage;
            formData['id']=1;
            axios.post('/messages', formData).then(response => {
                console.log(response.data);
            });
        }
    },
  };
  </script>