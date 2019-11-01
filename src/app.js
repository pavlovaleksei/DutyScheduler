import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './custom.scss'

import App from './App.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

import Scheduler from './components/Scheduler.vue'
import SchedulerCustom from './components/SchedulerCustom.vue'
import About from './components/About.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: Scheduler },
    { path: '/scheduler', component: SchedulerCustom },
    { path: '/about', component: About }
  ]
})

const app = new Vue({
  router
}).$mount('#app')
