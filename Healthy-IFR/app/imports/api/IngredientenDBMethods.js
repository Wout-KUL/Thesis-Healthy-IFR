import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { IngredientenDB } from '../db/IngredientenDB';
 
Meteor.methods({
  'ingredientenDB.insert'(ingredient) {
    check(ingredient.naam, String);
    check(ingredient.calorien, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    IngredientenDB.insert({
        naam: ingredient.naam,
        nutrienten: {calorien: ingredient.calorien, ijzer: ingredient.calorien},

        // createdAt: new Date,
        // userId: this.userId,
    })
  },

});