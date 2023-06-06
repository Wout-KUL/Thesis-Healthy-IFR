import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MaaltijdGeschiedenisDB } from '../db/MaaltijdGeschiedenisDB';
 
Meteor.methods({
  'maaltijdGeschiedenisDB.insert'() {
    // check(ingredient.naam, String);
    // check(ingredient.calorien, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    MaaltijdGeschiedenisDB.insert({
        userId: this.userId,
        geschiedenis: [],
    })
  },

  'maaltijdGeschiedenisDB.update'(nieuweGeschiedenis) {
    if (!this.userId) {
    throw new Meteor.Error('Not authorized.');
    }
    
    const geschiedenis = MaaltijdGeschiedenisDB.findOne({ _id: nieuweGeschiedenis._id, userId: this.userId });
    if (!geschiedenis) {
    throw new Meteor.Error('Access denied.');
    }

    MaaltijdGeschiedenisDB.update(nieuweGeschiedenis._id, {
        $set: {
            geschiedenis : nieuweGeschiedenis["geschiedenis"],
        },
      });
},
});
