import { Meteor } from 'meteor/meteor';
import { MaaltijdGeschiedenisDB } from '/imports/db/MaaltijdGeschiedenisDB';

Meteor.publish('maaltijdGeschiedenisDB', function publishTasks() {
  return MaaltijdGeschiedenisDB.find({ userId: this.userId });
});