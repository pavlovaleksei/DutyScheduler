<template>
  <div>
      <h1>File system</h1>
    <label>Token</label>
    <input type="text" @value="token" v-model="token"/>

    <label>INN</label>
    <input type="text" placeholder="00000000" v-model="inn"/>


    <button class="btn btn-default" v-on:click="onRestRequest">
      <span class="icon icon-folder"></span>
    </button>
      <!--<button class="btn btn-default" v-on:click="fileOpen">-->
        <!--<span class="icon icon-folder"></span>-->
      <!--</button>-->
  </div>
</template>

<script>
  const remote = window.require('electron').remote;
  const dialog = remote.dialog;

  window.$http = require('axios')

  export default {
    data () {
      return {
        files: [],
        token: '9e2939c36bbeeced4238363adc1780490ee7ec0f',
        inn: ''
      }
    },
    methods: {
      fileOpen (event) {
        let tempPath = dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections']
        });
      },

      onRestRequest() {
        var me = this;
        console.log('token', me.token);
        console.log('inn', me.inn)

        var time = performance.now();
// некий код


        for (let i = 0; i < 9; i++) {


          $http({
            method: 'post',
            url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Authorization": " Token " + me.token
            },
            data: {
              "query": "645300658" + i
            }
          }).then((data) => console.log(data.data.suggestions[0]))

        }

        time = performance.now() - time;
        console.log('Время выполнения = ', time);

      }



    }
  }
</script>
