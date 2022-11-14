<template>
    <fragment>
      <log-in v-if="!isAuthenticate" />
      <main-component v-else :userType='userType' />
  </fragment>
</template>

<script>
import LogIn from './components/Login.vue'
import { loginInfoStore } from './stores/loginInfo';
import MainComponent from "./components/dashboard/Main.vue";
import { mapState, mapActions } from 'pinia'

export default {
  data: function () {
    return {
      userType: ''
    };
  },
  components: {
    'log-in': LogIn,
    'main-component': MainComponent
  },
  computed: {
    ...mapState(loginInfoStore, ['getLoginInfo', 'isAuthenticate']),
  },
  mounted() {
    this.userType = this.getLoginInfo.user.role[0]
  }
};
</script>
<!-- <script setup>
import { ref, onMounted } from 'vue'
import LogIn from './components/Login.vue'
import { loginInfoStore } from './stores/loginInfo';
import MainComponent from "./components/dashboard/Main.vue";
import { mapState } from 'pinia'

// reactive state
const loginInfo = loginInfoStore()
let role = loginInfo.getLoginInfo.user.role[0]
let status = loginInfo.getAuthenticate

const userType = ref(role)
const isAuthenticate = ref(status)

 
// lifecycle hooks
onMounted(() => {
})
</script>
 

 -->
