import { Meteor } from 'meteor/meteor';
import { GroepsInformatieDB } from '/imports/db/GroepsInformatieDB';

Meteor.publish('GroepsInformatieDB', function publishTasks() {
  return GroepsInformatieDB.find({ userId: this.userId });
});