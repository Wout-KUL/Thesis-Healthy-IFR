import { Meteor } from 'meteor/meteor';
import { ReceptenDB } from '/imports/db/ReceptenDB';

Meteor.publish('receptenDB', function publishTasks() {
  return ReceptenDB.find();
});