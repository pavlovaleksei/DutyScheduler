<template>
  <div>
    <div style="text-align: center">{{msg}}</div>

    <b-form-input type="number" min="2019" max="2100" v-model="inputData.year"/>
    <b-form-input type="number" min="1" max="12" v-model="inputData.month"/>
    <b-form-textarea v-model="inputData.persons" placeholder="Иванов, Петров, Сидоров" rows="1" max-rows="3"></b-form-textarea>
    <b-form-input v-model="holidaysInMonth" placeholder="1,2,3"/>

    Первое дежурство в графике:
    <select v-model="firstDutyInMonth">
      <option disabled value="">Выберите сотрудника</option>
      <option v-for="item in getPersonsArray()">{{item}}</option>
    </select>
     <i v-if="firstDutyInMonth.length !== 0">Выбрано: {{firstDutyInMonth}}</i>


    <div  style="text-align: center">
      <b-button v-on:click="initTable">Сформировать</b-button>
    </div>
    <div>
      <b-table striped bordered small :items="scheduleData.data" :fields="scheduleData.fields"></b-table>
    </div>
    <div v-if="isTablesShow">
      <div style="text-align: center">Аналитика занятости сотрудников</div>
      <div>
        <table style="text-align: center" border="1" align="center" width="90%">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Деж</th>
              <th>Рез</th>
              <th>Отп</th>
              <th>Бол</th>
              <th>Ком</th>
              <th style="background-color: lightpink; color: white">Деж<br><i>(в.д.)</i></th>
              <th style="background-color: lightpink; color: white">Рез<br><i>(в.д.)</i></th>
              <th style="background-color: lightpink; color: white">Отп<br><i>(в.д.)</i></th>
              <th style="background-color: lightpink; color: white">Бол<br><i>(в.д.)</i></th>
              <th style="background-color: lightpink; color: white">Ком<br><i>(в.д.)</i></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in scheduleData.data">
              <td>{{item.name}}</td>
              <td>{{item.countsOfDuty.DUTY}}</td>
              <td>{{item.countsOfDuty.RESERVE}}</td>
              <td>{{item.countsOfDuty.VACATION}}</td>
              <td>{{item.countsOfDuty.DISEASE}}</td>
              <td>{{item.countsOfDuty.BUSINESS_TRIP}}</td>
              <td style="background-color: lightpink; color: white">{{item.countsOfDuty.HOLIDAYS_DUTY}}</td>
              <td style="background-color: lightpink; color: white">{{item.countsOfDuty.HOLIDAYS_RESERVE}}</td>
              <td style="background-color: lightpink; color: white">{{item.countsOfDuty.HOLIDAYS_VACATION}}</td>
              <td style="background-color: lightpink; color: white">{{item.countsOfDuty.HOLIDAYS_DISEASE}}</td>
              <td style="background-color: lightpink; color: white">{{item.countsOfDuty.HOLIDAYS_BUSINESS_TRIP}}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>
<script>
  import jsPDF from 'jspdf'

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
                persons: 'Волков, Павлова, Ведерников, Левкина, Баша'
                // persons: ''
            },
            status: {
              DUTY: 'Х',
              RESERVE: 'Р',
              VACATION: 'О',
              DISEASE: 'Б',
              BUSINESS_TRIP: 'K'
            },
            holidaysInMonth: '4',
            isTablesShow: false,
            firstDutyInMonth: ''
        }
      },
      methods: {

          /**
           * Get array of persons in hot
           * @return - array of persons in view
           */
          getPersonsArray() {
              return this.inputData.persons.replace(/\s+/g, '').split(',');
          },

          /**
           * Initialize schedule table
           */
          initTable() {
              let persons = this.inputData.persons.replace(/\s+/g, '').split(',');
              let personsCustomStatuses = [
                {
                  status: this.status.DEFAULT,
                  date: []
                },
                {
                  status: this.status.DISEASE,
                  date: [5,6,7]
                },
                {
                  status: this.status.DEFAULT,
                  date: []
                },
                {
                  status: this.status.DEFAULT,
                  date: []
                },
                {
                  status: this.status.DEFAULT,
                  date: []
                }
              ]

              this.scheduleData = this.getData(persons, personsCustomStatuses, this.inputData.year, this.inputData.month);

              console.log('data', this.scheduleData)

              this.setStatusesInTable(persons);
              this.setDutyCountOfPersons();
              this.isTablesShow = true;
          },

          /**
           * Save text as pdf
           * @param text - text or html to save a file.pdf
           * @param name - name file
           */
          savePdf(text, name) {
              let pdf = new jsPDF();
              pdf.text(text);
              pdf.save(name);
          },

          /**
           * Set code statuses in table
           * @param persons - Array of persons
           */
          setStatusesInTable(persons) {
            let me = this;
            if (persons.length > 0 && persons[0] !== '') {
              let count = 1;
              let selectedPersonNumber = 0;
              me.scheduleData.data.forEach((p, index, array) => {if (p.name === me.firstDutyInMonth) selectedPersonNumber = index});
              for (let i = 0; i < this.scheduleData.countDaysOfDate; i++) {
                  me.scheduleData.data.forEach((val, indexVal, arr) => {
                    if (count <= me.scheduleData.countDaysOfDate) {


                      if (indexVal < selectedPersonNumber) val = me.setStatusesInTableByPerson(val, count + me.scheduleData.data.length - selectedPersonNumber);
                      if (indexVal >= selectedPersonNumber) val = me.setStatusesInTableByPerson(val, count - selectedPersonNumber);
                      count++;
                    }
                  })
              }
            }
          },

          /**
           * Set status in schedule table by person
           * @param person - Person to want set status
           * @param index - Count day to set first status
           * @return - Person with hes status
           */
          setStatusesInTableByPerson(person, index) {
            person[(index).toString()] = this.status.DUTY;
            person[(index + 1).toString()] = this.status.RESERVE;
            return person;
          },

          /**
           * Get data to initialize schedule table
           * where data - information to build schedule table, fields - to rename rows
           * @param names - Array[String] - names of persons
           * @param year  - searchable year
           * @param month - searchable month
           * @return {{data: [], fields: [], countDaysOfDate: number}}
           */
          getData(names, personStatusesCustom, year, month) {

            console.log('personStatusesCustom', personStatusesCustom)

              let me = this;
              let count = new Date(year, month, 0).getDate();
              let response = { data: [], fields: [], countDaysOfDate: count };
              let fieldsValue = {};
              fieldsValue['key'] = 'name';
              fieldsValue['label'] = 'Фамилия';
              response.fields.push(fieldsValue);
              names.forEach((person,i,arr) => {
                  let dataValue = {};
                  dataValue['name'] = person;
                  dataValue['info'] = personStatusesCustom[i]
                  for (let i = 1; i <= count; i++) {
                      dataValue[i.toString()] = me.status.DEFAULT;
                  }
                  response.data.push(dataValue);
              });
              for (let i = 1; i <= count; i++) {
                let countDay = new Date(year, month-1, i).getDay();
                let fieldsValue = {};
                fieldsValue['key'] = i.toString();
                fieldsValue['label'] = i.toString();
                if (countDay === 6) fieldsValue['variant'] = 'secondary';
                if (countDay === 0) fieldsValue['variant'] = 'secondary';
                let holidays = me.holidaysInMonth.replace(/\s+/g, '').split(',');
                holidays.forEach(holiday => {if (fieldsValue['key'] === holiday.toString()) fieldsValue['variant'] = 'danger'});
                response.fields.push(fieldsValue);
              }
              return response;
          },

          /**
           * Set duty statuses
           */
          setDutyCountOfPersons() {
            let me = this;
            this.scheduleData.data.forEach((person, index, array) => {
                let countOfDuty = 0;
                let countOfReserve = 0;
                let countOfVacation = 0;
                let countOfDisease = 0;
                let countOfBusinessTrip = 0;
                let countOfDutyAtHolidays = 0;
                let countOfReserveAtHolidays = 0;
                let countOfVacationAtHolidays = 0;
                let countOfDiseaseAtHolidays = 0;
                let countOfBusinessTripAtHolidays = 0;
                Object.keys(person).forEach(val => {
                    if (person[val] === me.status.DUTY) {
                        if (me.scheduleData.fields[val] && me.scheduleData.fields[val].hasOwnProperty('variant')) countOfDutyAtHolidays++;
                        countOfDuty++;
                    }
                    if (person[val] === me.status.RESERVE) {
                        if (me.scheduleData.fields[val] && me.scheduleData.fields[val].hasOwnProperty('variant')) countOfReserveAtHolidays++;
                        countOfReserve++;
                    }
                    if (person[val] === me.status.VACATION) {
                        if (me.scheduleData.fields[val] && me.scheduleData.fields[val].hasOwnProperty('variant')) countOfVacationAtHolidays++;
                        countOfVacation++;
                    }
                    if (person[val] === me.status.DISEASE) {
                        if (me.scheduleData.fields[val] && me.scheduleData.fields[val].hasOwnProperty('variant')) countOfDiseaseAtHolidays++;
                        countOfDisease++;
                    }
                    if (person[val] === me.status.BUSINESS_TRIP) {
                        if (me.scheduleData.fields[val] && me.scheduleData.fields[val].hasOwnProperty('variant')) countOfBusinessTripAtHolidays++;
                        countOfBusinessTrip++;
                    }
                });
                person.countsOfDuty = {
                    DUTY: countOfDuty,
                    RESERVE: countOfReserve,
                    VACATION: countOfVacation,
                    DISEASE: countOfDisease,
                    BUSINESS_TRIP: countOfBusinessTrip,
                    HOLIDAYS_DUTY: countOfDutyAtHolidays,
                    HOLIDAYS_RESERVE: countOfReserveAtHolidays,
                    HOLIDAYS_VACATION: countOfVacationAtHolidays,
                    HOLIDAYS_DISEASE: countOfDiseaseAtHolidays,
                    HOLIDAYS_BUSINESS_TRIP: countOfBusinessTripAtHolidays,
                };
            })
          }
      }
  }
</script>
