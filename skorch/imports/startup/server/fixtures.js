import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import Games from '../../api/games/games.js';

if (!Meteor.isProduction) {
  const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: { first: 'Carl', last: 'Winslow' },
      games: [],
    },
    roles: ['admin'],
  }];

  users.forEach(({ email, password, profile, roles }) => {
    const userExists = Meteor.users.findOne({ 'emails.address': email });

    if (!userExists) {
      const userId = Accounts.createUser({ email, password, profile });
      Roles.addUsersToRoles(userId, roles);
    }
  });

  const gameData = {
    "players":[
      {"player":'Bob', "score":2},
      {"player":'Suzy', "score":1}
    ]
  };
  const games = [{
    gameTitle: 'Test Game',
    gamePhrasePublic: 'galloping green jalopy',
    gamePhrasePrivate: 'roving red rabbit',
    gameType: 'leaderboard',
    gameWinner: 'Bob',
    gameData: gameData
  },
    {
      gameTitle: 'Test Game 2',
      gamePhrasePublic: 'black white cow',
      gamePhrasePrivate: 'red white chicken',
      gameType: 'pingpong',
      gameWinner: 'Sue',
      gameData: gameData
    }
  ];

  games.forEach((game) => {
    Games.upsert({gamePhrasePublic: game.gamePhrasePublic}, {$set: game});
  })
}
