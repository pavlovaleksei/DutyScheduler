<template>
  <div>
    {{msg}}

    <b-table striped bordered :items="scheduleData"></b-table>
  </div>
</template>
<script>
  export default {
    name: 'Scheduler',
    data () {
      return {
          msg: 'Scheduler AA',
          scheduleData: [
              { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
              { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
              { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
              { age: 38, first_name: 'Jami', last_name: 'Carney' }
          ]
      }
    }
  }
</script>
