<template>
  <div>
    <div style="text-align: center">{{msg}}</div>

    <b-form-input type="number" min="2019" max="2100" v-model="inputData.year"/>
    <b-form-input type="number" min="1" max="12" v-model="inputData.month"/>
    <b-form-textarea v-model="inputData.persons" placeholder="Иванов, Петров, Сидоров" rows="1" max-rows="3"></b-form-textarea>
    <b-form-input v-model="holidaysInMonth" placeholder="1,2,3"/>
    <div  style="text-align: center">
      <b-button v-on:click="initTable">Сформировать</b-button>
    </div>
    <div>
      <b-table striped bordered small :items="scheduleData.data" :fields="scheduleData.fields"></b-table>
    </div>
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
                // persons: ''
            },
            status: {
              DUTY: 'Х',
              RESERVE: 'Р',
              VACATION: 'О',
              DISEASE: 'Б',
              BUSINESS_TRIP: 'K'
            },
            holidaysInMonth: '4'
        }
      },
      methods: {
          /**
           * Initialize schedule table
           */
          initTable() {
              let persons = this.inputData.persons.replace(/\s+/g, '').split(',');
              this.scheduleData = this.getData(persons, this.inputData.year, this.inputData.month);
              this.setStatusesInTable(persons);
              console.log('data', this.scheduleData);
              // this.getDutyCountOfPersons(this.inputData.year, this.inputData.month);
          },

          /**
           * Set code statuses in table
           * @param persons - Array of persons
           */
          setStatusesInTable(persons) {
            let me = this;
            if (persons.length > 0 && persons[0] !== '') {
              let count = 1;
              for (let i = 1; i < this.scheduleData.countDaysOfDate + 1; i++) {
                me.scheduleData.data.forEach(val => {
                  if (count <= me.scheduleData.countDaysOfDate) {
                    val[count.toString()] = me.status.DUTY;
                    val[(count + 1).toString()] = me.status.RESERVE;
                    count++;
                  }
                })
              }
            }
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
              let me = this;
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
                  }
                  response.data.push(dataValue);
              });
              for (let i = 1; i <= count; i++) {
                let countDay = new Date(year, month, i - 1).getDay();
                let fieldsValue = {};
                fieldsValue['key'] = i.toString();
                fieldsValue['label'] = i.toString();
                if (countDay === 5) fieldsValue['variant'] = 'secondary';
                if (countDay === 6) fieldsValue['variant'] = 'secondary';
                let holidays = me.holidaysInMonth.replace(/\s+/g, '').split(',');
                holidays.forEach(holiday => {if (fieldsValue['key'] === holiday.toString()) fieldsValue['variant'] = 'danger'});
                response.fields.push(fieldsValue);
              }
              return response;
          },

        //do not work, need refactoring....
          getDutyCountOfPersons(year, month) {
            let me = this;
            let countOfHolidays = 0;
            // for (let i = 0; i < this.scheduleData.countDaysOfDate; i++) {
            //   let countDay = new Date(year, month, i).getDay();
              this.scheduleData.data.forEach((person,i,arr) => {

                console.log(person.name)
                console.log('as',person['2'])
                for (let j = 1; j <= me.scheduleData.countDaysOfDate; j++) {
                  Object.keys(person).forEach(val => {
                    console.log(val)
                    if (val === '5' && person.val === 'Х' || val === '6' && person.val === 'Х'){
                      countOfHolidays++
                    }
                  })
                  // if (person[(j).toString()] === '5' || person[(j).toString()] === '6') {
                  //   countOfHolidays++
                  // }
                }



              })
            // }
            console.log('count days', countOfHolidays)
          }
      }
  }
</script>
