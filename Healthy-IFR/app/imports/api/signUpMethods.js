import SimpleSchema from 'simpl-schema';

Meteor.methods({
    'verify-signup-info'({ newUserName, newUserPassword, newUserPasswordConfirmed}) {
      new SimpleSchema({
        newUserName: { type: String },
        newUserPassword: { type: String },
        newUserPasswordConfirmed: { type: String }
      }).validate({ newUserName, newUserPassword, newUserPasswordConfirmed });

      if (newUserPassword == newUserPasswordConfirmed) {
        Accounts.createUser({
            username : newUserName,
            password: newUserPassword
        });
      }else{
        throw new Error('Both passwords are not the same')
      }
    }
  });