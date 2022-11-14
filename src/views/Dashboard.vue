<template>
  <admin-dashboard v-if="userType=='admin'" />
  <teacher-dashboard v-else-if="userType == 'teacher'" />
  <student-dashboard v-else-if="userType == 'student'" />
  <parent-dashboard v-else />
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import AdminDashboard from '../components/dashboard/dashboard/AdminDashboard.vue'
import TeacherDashboard from '../components/dashboard/dashboard/TeacherDashboard.vue'
import StudentDashboard from '../components/dashboard/dashboard/StudentDashboard.vue'
import ParentDashboard from '../components/dashboard/dashboard/ParentDashboard.vue'

import { loginInfoStore } from '../stores/loginInfo.js'
import { mapState } from 'pinia'

// reactive state
const loginInfo = loginInfoStore()
let role = loginInfo.getLoginInfo.user.role[0]

const userType = ref(role)

 

// lifecycle hooks
onMounted(() => {
})
</script>
