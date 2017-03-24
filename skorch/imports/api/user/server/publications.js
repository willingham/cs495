import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('user.data', () => Meteor.users.find({_id: this.userId}));
