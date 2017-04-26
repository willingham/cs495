import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import Games from '../../api/games/games.js';
import GameModel from '../../api/gameModel/gameModel';
import Tournaments from '../../api/tournaments/tournaments';

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
      {"player":'Bob', "scores":[
        {name:"score", value:2},
        {name:"penalty", value:1}
      ]},
      {"player":'Suzy', "scores":[
        {name:"score", value:1},
        {name:"penalty", value:0}
      ]}
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
              "alexaCommand":"add a point",
              "code":"(this.value + 1)"
            },
            {
              "btnText":"-1",
              "alexaCommand":"remove a point",
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
  });

  const tournament = [{
    "tournamentTitle": "Test Tournament",
    "tournamentPhrasePublic": "reallyredrabbit",
    "tournamentPhrasePrivate": "talltryingtiger",
    "gameData": [
      {
        "games": [
          {
            "id": "1",
            "leaf": "true",
            "home": {"id": "101", "name": "Albert"},
            "visitor": {"id": "102", "name": "Bob"},
            "winner": "102"
          },
          {
            "id": "2",
            "leaf": "true",
            "home": {"id": "103", "name": "Caleb"},
            "visitor": {"id": "104", "name": "David"},
            "winner": "103"
          },
          {
            "id": "3",
            "leaf": "true",
            "home": {"id": "105", "name": "Edward"},
            "visitor": {"id": "106", "name": "Fred"},
            "winner": "105"
          },
          {
            "id": "4",
            "leaf": "true",
            "home": {"id": "107", "name": "George"},
            "visitor": {"id": "108", "name": "Harold"},
            "winner": ""
          }
        ]
      },
      {
        "games": [
          {
            "id": "5",
            "leaf": "false",
            "home": {"id": "102", "name": "Bob", "gameId": "1"},
            "visitor": {"id": "103", "name": "Caleb", "gameId": "2"},
            "winner": "102"
          },
          {
            "id": "6",
            "leaf": "false",
            "home": {"id": "105", "name": "Edward", "gameId": "3"},
            "visitor": {"id": "", "name": "", "gameId": "4"},
            "winner": ""
          }
        ]
      },
      {
        "games": [
          {
            "id": "7",
            "leaf": "false",
            "home": {"id": "102", "name": "Bob", "gameId": "5"},
            "visitor": {"id": "", "name": "", "gameId": "6"},
            "winner": ""
          }
        ]
      }
    ]
  }]

  tournament.forEach((t) => {
    Tournaments.upsert({}, {$set:t});
  });
}

