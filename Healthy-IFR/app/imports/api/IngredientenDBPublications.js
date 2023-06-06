import { Meteor } from 'meteor/meteor';
import { IngredientenDB } from '/imports/db/IngredientenDB';

Meteor.publish('ingredientenDB', function publishTasks() {
  return IngredientenDB.find();
});