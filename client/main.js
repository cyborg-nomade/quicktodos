import {
  Template
} from 'meteor/templating';

const todos = [{
    text: 'radiologika'
  },
  {
    text: 'Westwing'
  },
  {
    text: 'processo'
  }
];

import './main.html';

Template.main.helpers({
  title: function() {
    return 'QuickTodos';
  },
  todos: function() {
    return todos;
  }
});