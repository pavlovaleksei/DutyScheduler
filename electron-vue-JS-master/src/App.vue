<template>
  <div>
    <h1>{{ msg }}</h1>
    <clock/>
    <PcConf/>
  </div>
</template>

<script>
  import Clock from './components/Clock.vue'
  import PcConf from './components/PcConfiguration.vue'

  export default {
    data () {
      return {
        msg: 'PC configuration'
      }
    },
    components: {
      Clock, PcConf
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
