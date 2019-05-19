//external modules
import {
  Meteor
} from 'meteor/meteor';

//app modules
import '../lib/collections';

Meteor.publish("todos", function todoPublication() {
  return Todos.find();
});

//db operations
Meteor.methods({
  //insert todo
  "todos.insert": function(text, time) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Todos.insert({
      text,
      time,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  //check todo item
  "todos.setChecked": function(id, setChecked) {
    Todos.update(id, {
      $set: {
        checked: setChecked
      }
    });
  },
  //delete todo item
  "todos.remove": function(id) {
    Todos.remove(id);
  }
});