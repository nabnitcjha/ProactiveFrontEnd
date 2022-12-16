import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'log-in',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue')
  },
   // calendar
   {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/Calendar.vue')
  },
  // student
  {
    path: '/add-student',
    name: 'addStudent',
    component: () => import('../views/form/student/AddStudent.vue')
  },
  {
    path: '/edit-student',
    name: 'editStudent',
    component: () => import('../views/form/student/EditStudent.vue')
  },
  {
    path: '/student-detail',
    name: 'studentDetail',
    component: () => import('../views/detail/StudentDetail.vue')
  },
  // teacher
  {
    path: '/add-teacher',
    name: 'addTeacher',
    component: () => import('../views/form/teacher/AddTeacher.vue')
  },
  {
    path: '/edit-teacher',
    name: 'editTeacher',
    component: () => import('../views/form/teacher/EditTeacher.vue')
  },
  {
    path: '/teacher-detail',
    name: 'teacherDetail',
    component: () => import('../views/detail/TeacherDetail.vue')
  },
  // subject
  {
    path: '/add-subject',
    name: 'addSubject',
    component: () => import('../views/form/subject/AddSubject.vue')
  },
  {
    path: '/edit-subject',
    name: 'editSubject',
    component: () => import('../views/form/subject/EditSubject.vue')
  },
  // class schedule
  {
    path: '/add/class-schedule',
    name: 'addClassSchedule',
    component: () => import('../views/form/classSchedule/AddClassSchedule.vue')
  },
  {
    path: '/edit/class-schedule',
    name: 'editClassSchedule',
    component: () => import('../views/form/classSchedule/EditClassSchedule.vue')
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router