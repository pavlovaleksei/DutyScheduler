import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter)

import Contacts from './components/Contacts.vue'
import Music from './components/Music.vue'
import Scheduler from './components/Scheduler.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: Scheduler }
    // { path: '/contacts', component: Contacts },
    // { path: '/music', component: Music },
    // { path: '/scheduler', component: Scheduler }
  ]
})

const app = new Vue({
  router
}).$mount('#app')
