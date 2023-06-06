import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ReceptenDB } from '../db/ReceptenDB';
 
Meteor.methods({
  'receptenDB.insert'(recept) {
    check(recept.link, String);
    check(recept.ingredienten, String);
    check(recept.titel, String);
    check(recept.beschrijving, String);
    check(recept.bereidingswijze, String);
    check(recept.imgLink, String);



    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    ReceptenDB.insert({
        link: recept.link,
        ingredienten: recept.ingredienten,
        titel: recept.titel,
        beschrijving: recept.beschrijving,  
        bereidingswijze: recept.bereidingswijze,
        imgLink: recept.imgLink,
        // createdAt: new Date,
        // userId: this.userId,
    })
  },

//   'workouts.setIsChecked'(workoutId, isChecked) {
//     check(workoutId, String);
//     check(isChecked, Boolean);

//     if (!this.userId) {
//       throw new Meteor.Error('Not authorized.');
//     }

//     const task = WorkoutsCollection.findOne({ _id: workoutId, userId: this.userId });

//     if (!task) {
//       throw new Meteor.Error('Access denied.');
//     }

//     WorkoutsCollection.update(workoutId, {
//       $set: {
//         isChecked,
//       },
//     });
//   },

});