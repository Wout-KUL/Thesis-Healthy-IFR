import { Meteor } from 'meteor/meteor';
import { ActivityLogboekDB } from '/imports/db/ActivityLogboekDB';

Meteor.publish('ActivityLogboekDB', function publishTasks() {
  return ActivityLogboekDB.find({ userId: this.userId });
});