import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { GroepsInformatieDB } from '../db/GroepsInformatieDB';
 
Meteor.methods({
    'GroepsInformatieDB.insert'() {
        if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
        }

        GroepsInformatieDB.insert({
            userId: this.userId,
            group: [],
            notifications : true,

        })
    },

    'GroepsInformatieDB.update'(groepInfo) {
        if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
        }
        
        const groep = GroepsInformatieDB.findOne({ _id: groepInfo._id, userId: this.userId });
        if (!groep) {
        throw new Meteor.Error('Access denied.');
        }

        GroepsInformatieDB.update(groepInfo._id, {
            $set: {
                group : groepInfo["group"],
            },
          });
    },

    'GroepsInformatieDB.setIsChecked'(groepInfo, persoon) {
        if (!this.userId) {
          throw new Meteor.Error('Not authorized.');
        }
    
        const groep = GroepsInformatieDB.findOne({ _id: groepInfo._id, userId: this.userId });
        if (!groep) {
          throw new Meteor.Error('Access denied.');
        }

        for (let index = 0; index < groepInfo["group"].length; index++) {
            if (groepInfo["group"][index]["naam"]==persoon["naam"]) {
                groepInfo["group"][index]["checked"] = !groepInfo["group"][index]["checked"]
            }
        }

        GroepsInformatieDB.update(groepInfo._id, {
          $set: {
            group : groepInfo["group"],
          },
        });
      },

      'GroepsInformatieDB.removeGroepslid'(groepInfo, persoon) {
        if (!this.userId) {
          throw new Meteor.Error('Not authorized.');
        }
    
        const groep = GroepsInformatieDB.findOne({ _id: groepInfo._id, userId: this.userId });
        if (!groep) {
          throw new Meteor.Error('Access denied.');
        }

        console.log(groepInfo)
        groepInfo["group"] = groepInfo["group"].filter(currPersoon => (
            currPersoon["naam"] != persoon["naam"]
        ))
        console.log(groepInfo)

        GroepsInformatieDB.update(groepInfo._id, {
          $set: {
            group : groepInfo["group"],
          },
        });
      },

      'GroepsInformatieDB.setMeldingen'(groepInfo, newValue) {
        console.log("newValue ", newValue);
        if (!this.userId) {
          throw new Meteor.Error('Not authorized.');
        }
    
        const groep = GroepsInformatieDB.findOne({userId: this.userId });
        if (!groep) {
          throw new Meteor.Error('Access denied.');
        }

        GroepsInformatieDB.update(groepInfo._id, {
          $set: {
            notifications : newValue,
          },
        });
      },

});