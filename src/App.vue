<template>
  <div>
    <h1>{{ msg }}</h1>
    <Scheduler/>
    <SchedulerCustom/>
    <About/>
  </div>
</template>

<script>
  import Scheduler from './components/Scheduler.vue'
  import SchedulerCustom from "./components/SchedulerCustom.vue";
  import About from './components/About.vue'

  export default {
    data () {
      return {
        msg: 'PC configuration'
      }
    },
    components: {
      Scheduler, SchedulerCustom, About
    }
  }
</script>

<style>
  .container {
    text-align: center;
    margin: 0 auto;
    padding-top: 70px;
  }
</style>
