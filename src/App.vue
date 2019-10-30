<template>
  <div>
    <h1>{{ msg }}</h1>
    <Scheduler/>
    <About/>
  </div>
</template>

<script>
  import Scheduler from './components/Scheduler.vue'
  import About from './components/About.vue'

  export default {
    data () {
      return {
        msg: 'PC configuration'
      }
    },
    components: {
      Scheduler, About
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
