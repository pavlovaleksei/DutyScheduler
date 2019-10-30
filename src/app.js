import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter)

import Scheduler from './components/Scheduler.vue'
import About from './components/About.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: Scheduler },
    { path: '/about', component: About }
  ]
})

const app = new Vue({
  router
}).$mount('#app')
