//external modules
import {
  Template
} from 'meteor/templating';
import {
  Accounts
} from 'meteor/accounts-base';

//app modules
import '../lib/collections';

//views
import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.main.helpers({
  title: function() {
    return 'QuickTodos';
  },
  todos: function() {
    const todos = Todos.find();
    return todos;
  }
});

Template.main.events({
  "submit .add-todo": function(event) {
    event.preventDefault();

    const text = event.target.text.value;
    const time = event.target.time.value;
    Todos.insert({
      text,
      time,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });

    event.target.text.value = '';
    event.target.time.value = '';
  }
});

Template.todo.events({
  "click .toggle-checked": function(event) {
    Todos.update(this._id, {
      $set: {
        checked: !this.checked
      }
    })
  },
  "click .delete": function(event) {
    Todos.remove(this._id);
  }
});