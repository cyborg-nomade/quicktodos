//external modules
import {
  Meteor
} from 'meteor/meteor';

//app modules
import '../lib/collections';

Meteor.publish("todos", function todoPublication() {
  return Todos.find({
    $or: [{
        private: {
          $ne: true
        }
      },
      {
        owner: this.userId
      }
    ]
  });
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
    if (todo.owner !== this.userId) {
      throw new Meteor.Error('Unauthorized');
    }

    Todos.remove(id);
  },
  //set todo to private
  "todos.setPrivate": function(id, setToPrivate) {
    const todo = Todos.findOne(id);

    if (todo.owner !== this.userId) {
      throw new Meteor.Error('Unauthorized');
    }

    Todos.update(id, {
      $set: {
        private: setToPrivate
      }
    });
  }
});