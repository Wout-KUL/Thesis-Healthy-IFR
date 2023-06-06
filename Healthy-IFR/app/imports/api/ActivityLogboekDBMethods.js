import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ActivityLogboekDB } from '../db/ActivityLogboekDB';
 
Meteor.methods({
    'ActivityLogboekDB.insert'() {
        if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
        }

        ActivityLogboekDB.insert({
            userId: this.userId,
            logs: [],
            timeLogs: [],
            total: {}
        })
    },

    'ActivityLogboekDB.update'(userLog) {
        console.log("updatelogbook");
        console.log(this.userid, userLog["total"])
        if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
        }
        
        const logInDB = ActivityLogboekDB.findOne({ _id: userLog._id, userId: this.userId });
        if (!logInDB) {
        throw new Meteor.Error('Access denied.');
        }

        ActivityLogboekDB.update(userLog._id, {
            $set: {
                logs : userLog["logs"],
                timeLogs: userLog["timeLogs"],
                total : userLog["total"],
            },
          });
    },
});