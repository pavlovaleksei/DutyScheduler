<template>
  <div class="contacts">
    <h1>Contacts
      <a v-if="action === 'list'" class="btn btn-primary" @click.prevent="changeAction('new')">Add new</a>
      <a v-else class="btn btn-primary" @click.prevent="changeAction('list')">Show all</a>
      <br>
      CRUD Example
    </h1>

    <form v-if="action === 'new' || action === 'edit'" style="text-align: left;">
      <div class="form-group">
        <label>Surname</label>
        <input type="text" class="form-control" placeholder="Enter you surname" v-model="contact.surname">
      </div>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Enter you name" v-model="contact.name">
      </div>
      <div class="form-group">
        <label>Age</label>
        <input type="number" min="18" max="90" placeholder="18" class="form-control" v-model="contact.age">
      </div>
      <div class="form-group">
        <label>Sex</label>
        <select class="form-control" v-model="contact.sex">
          <option selected value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" placeholder="example@example.com" v-model="contact.email">
      </div>
      <div class="form-group">
        <label>Group</label>
        <input type="text" class="form-control" placeholder="211" v-model="contact.group">
      </div>
      <div class="form-group">
        <label>Rating</label>
        <input type="number" min="0" max="10" class="form-control" placeholder="10" v-model="contact.rating">
      </div>

      <div class="form-actions">
        <button v-if="action === 'edit'" type="submit" class="btn btn-form btn-primary"
                @click.prevent="updateContact(currentContactId)">Update
        </button>
        <button v-else type="submit" class="btn btn-form btn-primary" @click.prevent="saveContact">Save</button>
      </div>
    </form>

    <table class="table-striped" v-if="action === 'list'">
      <thead>
      <tr>
        <th>Surname</th>
        <th>Name</th>
        <th>Age</th>
        <th>Sex</th>
        <th>Email</th>
        <th>Group</th>
        <th>Rating</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in contacts">
        <td>{{item.surname}}</td>
        <td>{{item.name}}</td>
        <td>{{item.age}}</td>
        <td>{{item.sex}}</td>
        <td>{{item.email}}</td>
        <td>{{item.group}}</td>
        <td>{{item.rating}}</td>
        <td>
          <a href="#" @click.prevent="editContact(item)"><span class="icon icon-pencil"></span></a>
          <a href="#" @click.prevent="removeContact(item)"><span class="icon icon-cancel-circled"></span></a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

  export default {

    data() {
      return {
        errors: [],
        action: 'list',
        contacts: [
          {
            surname: 'Petrov',
            name: 'Petr',
            age: 27,
            sex: 'Man',
            email: 'petrov@test.com',
            group: 3,
            rating: 9
          },
          {
            surname: 'Ivanov',
            name: 'Ivan',
            age: 43,
            sex: 'Man',
            email: 'ivanov@test.com',
            group: 2,
            rating: 7
          },
          {
            surname: 'Mashina',
            name: 'Maria',
            age: 19,
            sex: 'Woman',
            email: 'maria@test.com',
            group: 3,
            rating: 9
          }
        ],
        currentContactId: null,
        contact: {
          surname: '',
          name: '',
          age: null,
          sex: '',
          email: '',
          group: null,
          rating: null
        }

      }
    },
    methods: {
      /**
       * Init new contact
       * @param action (String) name of action
       */
      changeAction(action) {
        this.action = action;
        this.contact.surname = '';
        this.contact.age = null;
        this.contact.sex = '';
        this.contact.email = '';
        this.contact.group = null;
        this.contact.rating = null;
      },

      /**
       * Save new contact in array of contacts
       */
      saveContact() {
        this.action = 'new';

        let newContact = {
          surname: this.contact.surname,
          name: this.contact.name,
          age: this.contact.age,
          sex: this.contact.sex,
          email: this.contact.email,
          group: this.contact.group,
          rating: this.contact.rating
        };
        this.contacts.push(newContact);

        this.showNotification('Added new contact', this.contact);
        this.action = 'list';
      },

      /**
       * Edit selected contact
       * @param contact (Object contact)
       */
      editContact(contact) {
        this.action = 'edit';
        this.currentContactId = this.contacts.indexOf(contact);

        this.contact.surname = contact.surname;
        this.contact.name = contact.name;
        this.contact.age = contact.age;
        this.contact.sex = contact.sex;
        this.contact.email = contact.email;
        this.contact.group = contact.group;
        this.contact.rating = contact.rating;
      },

      /**
       * Remove selected contact
       * @param contact (Object contact)
       */
      removeContact(contact) {
        let index = this.contacts.indexOf(contact);
        this.contacts.splice(index, 1);
        this.showNotification('Contact removed', this.contact);
      },

      /**
       * Update contact by id
       * @param id (Int)
       */
      updateContact(id) {
        this.contacts[id].surname = this.contact.surname;
        this.contacts[id].name = this.contact.name;
        this.contacts[id].age = this.contact.age;
        this.contacts[id].sex = this.contact.sex;
        this.contacts[id].email = this.contact.email;
        this.contacts[id].group = this.contact.group;
        this.contacts[id].rating = this.contact.rating;

        this.showNotification('Contact updated', this.contact);
        this.action = 'list';
      },

      /**
       * Show notification message
       * @param title   (String)
       * @param contact (Object)
       */
      showNotification(title, contact) {
        new Notification(title, {
          body: 'Name: ' + contact.surname + ' ' + contact.name + '<br>' +
          'Age: ' + contact.age + '<br>' +
          'Sex: ' + contact.sex + '<br>' +
          'Email: ' + contact.email + '<br>' +
          'Group: ' + contact.group + '<br>' +
          'Rating: ' + contact.rating
        });
      }
    }
  }
</script>
<style>
  .contacts{
    text-align: left;
  }
</style>
