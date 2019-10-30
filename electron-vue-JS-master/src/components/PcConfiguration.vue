<template>
  <div>
    <ul class="pc_config">
      <li>Platform: {{platform}}</li>
      <li>Host name: {{hostname}}</li>
      <li>Home directory: {{homedit}}</li>
      <li>User information: {{userInfo.username}}</li>
      <li>Cpu: {{cpu[0].model}} {{cpu[0].speed}}</li>
      <li>Ip address: {{network.enp3s0[0].address}}</li>
      <li>Mac address: {{network.enp3s0[0].mac}}</li>
      <li>Mask: {{network.enp3s0[0].netmask}}</li>
    </ul>
  </div>
</template>
<script>
  let os = require('os');

  export default {
    data() {
      return{
        message: 'test message',
        hostname: os.hostname(),
        homedit: os.homedir(),
        userInfo: os.userInfo(),
        cpu: os.cpus(),
        network: os.networkInterfaces(),
        platform: os.platform()
      }
    },
    methods:{
      test(){
        console.log(os.networkInterfaces())
      }
    }
  }
</script>
<style>
  .pc_config {
    text-align: left;
  }

</style>
