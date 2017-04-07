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
      title: "Basketball",
      numTeams: 2,
      teamCounters: [
          {
              name: "Score",
              code: "(sumCounter('Points', this))"
          },
          {
              name: "Mascot High 5s",
              value: 0,
              modifiers: [
                  {
                      btnText: "+1",
                      alexaCommand: "increment",
                      code: "(this.value + 1)"
                  }
              ]
          }
      ],
      playerCounters: [
          {
              name: "Points",
              value: 0,
              modifiers: [
                  {
                      btnText: "+1",
                      alexaCommand: "plus one",
                      code: "(this.value + 1)"
                  },
                  {
                      btnText: "+2",
                      alexaCommand: "plus two",
                      code: "(this.value + 2)"
                  },
                  {
                      btnText: "+3",
                      alexaCommand: "plus three",
                      code: "(this.value + 3)"
                  }
              ]
          }
      ],
      teamConditions: [
          {
              condition: "((getCounterValue('Mascot High 5s', this)) >=5)",
              code: "win(this)"
          }
      ],
      playerConditions: [
          {
              condition: "((getCounterValue('Points', this)) >= 10)",
              code: "dqplayer(this)"
          }
      ]
  }

  ];
  model.forEach((m) =>{
    GameModel.upsert({}, {$set:m});
  })

}

