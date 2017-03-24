import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.games = [];
        user.profile = options.profile;
    }
    return user;
});
