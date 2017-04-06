import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import Games from '../../api/games/games.js';
import GameModel from '../../api/gameModel/gameModel';

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
      {"player":'Bob', "scores":{
        "score": 2,
        "penalty":1
      }},
      {"player":'Suzy', "scores":{
        "score": 1,
        "penalty": 0
      }}
    ]
  };
  const games = [{
    gameTitle: 'Test Game',
    gamePhrasePublic: 'gallopinggreenjalopy',
    gamePhrasePrivate: 'rovingredrabbit',
    gameType: 'leaderboard',
    gameWinner: 'Bob',
    gameData: gameData
  },
    {
      gameTitle: 'Test Game 2',
      gamePhrasePublic: 'blackwhitecow',
      gamePhrasePrivate: 'redwhitechicken',
      gameType: 'leaderboard',
      gameWinner: 'Sue',
      gameData: gameData
    }
  ];

  games.forEach((game) => {
    Games.upsert({gamePhrasePublic: game.gamePhrasePublic}, {$set: game});
  });

  const model = [{
    name:"leaderboard",
    model:{
      "numTeams":2,
      "playerCounters":[
        {
          "name":"score",
          "start":0,
          "modifiers":[
            {
              "btnText":"+1",
              "alexaCommand":"increment",
              "code":"(this.value + 1)"
            },
            {
              "btnText":"-1",
              "alexaCommand":"decrement",
              "code":"(this.value - 1)"
            }
          ]
        },
        {
          "name":"penalty",
          "start":0,
          "modifiers":[
            {
              "btnText":"+1",
              "alexaCommand":"increment",
              "code":"(this.value + 1)"
            },
            {
              "btnText":"-1",
              "alexaCommand":"decrement",
              "code":"(this.value - 1)"
            }
          ]
        }
      ],
      "teamCounters":[
        {
          "name":"teamScore",
          "code":"(sumCounter('score', this))"
        }
      ],
      "playerConditions":[
        {
          "condition":"((getCounterValue('penalty', this)) >= 3)",
          "result":"dqplayer(this)"
        }
      ],
      "teamConditions":[
        {
          "condition":"((getCounterValue('teamScore', this)) >= 10)",
          "result":"win(this)"
        }
      ]
    }
  }

  ];
  model.forEach((m) =>{
    GameModel.upsert({}, {$set:m});
  })

}

