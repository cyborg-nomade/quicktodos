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

//username instead of emails
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.main.onCreated(function mainOnCreate() {
  Meteor.subscribe('todos');
});

//helpers
Template.main.helpers({
  title: function() {
    return 'QuickTodos';
  },
  todos: function() {
    const todos = Todos.find();
    return todos;
  }
});

//events
Template.main.events({
  //insert todo
  "submit .add-todo": function(event) {
    event.preventDefault();

    const text = event.target.text.value;
    const time = event.target.time.value;

    Meteor.call('todos.insert', text, time);

    event.target.text.value = '';
    event.target.time.value = '';
  }
});

Template.todo.events({
  //check todo item
  "click .toggle-checked": function(event) {
    Meteor.call('todos.setChecked', this._id, !this.checked);
  },
  //delete todo item
  "click .delete": function(event) {
    Meteor.call('todos.remove', this._id)
  }
});