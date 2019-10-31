<template>
  <div>
    <div style="text-align: center">{{msg}}</div>

    <b-form-input type="number" min="2019" max="2100" v-model="inputData.year"/>
    <b-form-input type="number" min="1" max="12" v-model="inputData.month"/>
    <b-form-textarea v-model="inputData.persons" placeholder="Иванов, Петров, Сидоров" rows="1" max-rows="6"></b-form-textarea>

    <b-button v-on:click="initTable">Сформировать</b-button>
    <b-table striped bordered small :items="scheduleData.data" :fields="scheduleData.fields"></b-table>
  </div>
</template>
<script>
  export default {
      name: 'Scheduler',
      data () {
        return {
            msg: 'График учета дежурств',
            scheduleData: {
                data: [],
                fields: [],
                countDaysOfDate: 0
            },
            inputData: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                persons: 'Петров, Иванов, Валентинов'
            }
        }
      },
      methods: {

          /**
           * Initialize schedule table
           */
          initTable() {
              let persons = this.inputData.persons.replace(/\s+/g, '').split(',');
              let me = this;
              this.scheduleData = this.getData(persons, this.inputData.year, this.inputData.month);

              let am = this.scheduleData.countDaysOfDate / persons.length;
              console.log('am', am)
              persons.forEach(v => {
                  for (let i = 1; i < me.scheduleData.countDaysOfDate + 1; i++) {
                      console.log('n',me.scheduleData.data)
                      console.log('v',me.scheduleData.data)
                      if (me.scheduleData.data.name === v) {
                          me.scheduleData.data[(i+persons.length).toString()] = 'X'
                      }

                  }
              })
          },

          /**
           * Get data to initialize schedule table
           * where data - information to build schedule table, fields - to rename rows
           * @param names - Array[String] - names of persons
           * @param year  - searchable year
           * @param month - searchable month
           * @return {{data: [], fields: [], countDaysOfDate: number}}
           */
          getData(names, year, month) {
              let count = new Date(year, month, 0).getDate();
              let response = { data: [], fields: [], countDaysOfDate: count };
              let fieldsValue = {};
              fieldsValue['key'] = 'name';
              fieldsValue['label'] = 'Фамилия';
              response.fields.push(fieldsValue);
              names.forEach(person => {
                  let dataValue = {};
                  dataValue['name'] = person;
                  for (let i = 1; i <= count; i++) {
                      dataValue[i.toString()] = '';
                      let fieldsValue = {}
                      fieldsValue['key'] = i.toString();
                      fieldsValue['label'] = i.toString();
                      response.fields.push(fieldsValue);
                  }
                  response.data.push(dataValue);
              });
              return response;
          }
      }
  }
</script>
