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

const scoreModifiers = [
    { btnText: "+1" },
    { btnText: "-1" },
    { btnText: "-1" },
    { btnText: "x2" }
];

const penaltyModifiers = [
    { btnText: "+1" },
    { btnText: "-1" },
];

const teamAlabamaCounters = [
    {
        value: 4,
        name: "points",
        modifiers: penaltyModifiers,
    },
    {
        value: 0,
        name: "flags",
        modifiers: penaltyModifiers,
    },
];

const teamAuburnCounters = [
    {
        value: 1,
        name: "points",
        modifiers: penaltyModifiers,
    },
    {
        value: 2,
        name: "flags",
        modifiers: penaltyModifiers,
    },
];

const alabamaCounters = [
    {
        value: 10,
        name: "score",
        modifiers: scoreModifiers,
    },
    {
        value: 3,
        name: "penalty",
        modifiers: penaltyModifiers,
    },
];

const auburnCounters = [
    {
        value: 3,
        name: "score",
        modifiers: scoreModifiers,
    },
    {
        value: 10,
        name: "penalty",
        modifiers: penaltyModifiers,
    },
];

const alabamaPlayers = [
    {
        name: "Thomas",
        counters: alabamaCounters,
    },
    {
        name: "Nath",
        counters: alabamaCounters,
    },
    {
        name: "Cody",
        counters: alabamaCounters,
    },
    {
        name: "Will",
        counters: alabamaCounters,
    },
];

const auburnPlayers = [
    {
        name: "Jim",
        counters: auburnCounters,
    },
    {
        name: "Dale",
        counters: auburnCounters,
    },
    {
        name: "Hank",
        counters: auburnCounters,
    },
    {
        name: "Rob",
        counters: auburnCounters,
    },
];

const teams = [
    {
        name: "Alabama",
        counters: teamAlabamaCounters,
        players: alabamaPlayers,
    },
    {
        name: "Auburn",
        counters: teamAuburnCounters,
        players: auburnPlayers,
    },
];

  const games = [{
    title: 'The Iron Bowl',
    publicGamePhrase: 'GoofyGolfingGoat',
    privateGamePhrase: 'PinkProwlingPanther',
    teams: teams
  },
  ];

  games.forEach((game) => {
    Games.upsert({publicGamePhrase: game.publicGamePhrase}, {$set: game});
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

