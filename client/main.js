import {
  Template
} from 'meteor/templating';
import '../lib/collections';

import './main.html';

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
      time
    });

    event.target.text.value = '';
    event.target.time.value = '';
  }
});