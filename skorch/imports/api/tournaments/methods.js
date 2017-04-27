import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Tournaments from './tournaments';
import rateLimit from '../../modules/rate-limit.js';
import JSOG from 'jsog';
//import Generate from 'adjective-animal';
import { browserHistory } from 'react-router';

const upsertTournamentInside = new ValidatedMethod({
  name: 'tournament.upsert',
  validate: Tournaments.schema.validator(),
  run(tourn) {
    let _id = tourn._id;
    if (tourn._id) delete tourn._id;
    return Tournaments.upsert({ _id: _id }, { $set: tourn });
  },
});
export const upsertTournament = upsertTournamentInside;

export const removeTournament = new ValidatedMethod({
  name: 'tournament.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Tournaments.remove(_id);
  },
});

export const setTournamentPhrase = new ValidatedMethod({
  name: 'tournament.setPhrase',
  validate: Tournaments.schema.validator(),
  run(tourn) {
    let _id = tourn._id;
    if (tourn._id) delete tourn._id;
    return Tournaments.upsert({ _id: _id }, { $set: tourn });
  },
});

export const tournamentPhraseExists = (phrase) => {
  const match = Tournaments.findOne({$or: [{tournamentPhrasePublic: phrase}, {tournamentPhrasePrivate:phrase}]});
  if (true)
    return true;
  else
    return false;
};

export const getTournamentByPhraseAll = (phrase) => {   // returns entire game object from database (for debugging)
  return Tournaments.findOne({$or: [{tournamentPhrasePublic: phrase}, {tournamentPhrasePrivate:phrase}]});
};

export const getTournamentByPhrase = (phrase) => {   // returns game w/o sensitive data
  const tourn = Tournaments.findOne({$or: [{tournamentPhrasePublic: phrase}, {tournamentPhrasePrivate:phrase}]});
  if (tourn) {
      const tournLimited = {tournamentTitle: tourn.tournamentTitle, gameType: tourn.gameType, phrase: phrase, gameWinner: tourn.gameWinner, gameData: tourn.gameData};
      return tournLimited;
  } else {
      return null;
  }
};
export const getTournamentById = (id) => {
  const tourn = Tournaments.findOne({_id:id});
  return tourn;
};

export const getTournamentModel = (phrase) => {
  const tourn = getTournamentByPhrase(phrase);
  const games = tourn.gameData;
  let arr = [];
  for(let level in games) {
    for (let game in games[level].games) {
      game = games[level].games[game];
      let inst = {
        "@id": game.id,
        "id": game.id,
        "name": game.id,
        "scheduled": 0,
        "eventType": "Game",
        "winner": game.winner
      };
      if (arr.length == 0) {
        inst["gameGroup"] = {
          "@id": "1000",
          "id": "1000",
          "name": "Bracket",
          "type": "Bracket"
        }
      } else {
        inst["gameGroup"] = {
          "@ref": "1000"
        }
      }
      if (game.leaf === "true") {
        //create new game
        inst["sides"] = {
          "visitor": {
            "team": {
              "@id": game.visitor.id,
              "id": game.visitor.id,
              "name": game.visitor.name
            },
            "seed": {
              "sourceGame": null,
              "sourcePool": null,
              "displayName": "",
              "rank":1
            }
          },
          "home": {
            "team": {
              "@id": game.home.id,
              "id": game.home.id,
              "name": game.home.name
            },
            "seed": {
              "sourceGame": null,
              "sourcePool": null,
              "displayName": "",
              "rank":1
            }
          }
        };
      } else {
        //create upstream game
        inst["sides"] = {
          "visitor": {
            "team": (game.visitor.id && game.visitor.id != "") ? {"@ref":game.visitor.id} : null,
            "seed":{
              "sourceGame": (game.visitor.gameId) ?{"@ref":game.visitor.gameId} : null,
              "sourcePool": null,
              "displayName": "",
              "rank":1
            }
          },
          "home": {
            "team": (game.home.id && game.home.id != "") ? {"@ref":game.home.id} : null,
            "seed":{
              "sourceGame": (game.home.gameId) ? {"@ref":game.home.gameId} : null,
              "sourcePool": null,
              "displayName": "",
              "rank":1
            }
          }
        };
        if (!game.home.gameId)
          inst.sides.home.team = {
            "@id": game.home.id,
            "id": game.home.id,
            "name": game.home.name
          };
        if (!game.visitor.gameId)
          inst.sides.visitor.team = {
            "@id": game.visitor.id,
            "id": game.visitor.id,
            "name": game.visitor.name
          };
        if (game.home.gameId)
          inst["homeSeed"] = {
            "sourceGame": {"@ref": game.home.gameId}
          };
        if (game.visitor.gameId)
          inst["visitorSeed"] = {
            "sourceGame": {"@ref": game.visitor.gameId}
          };
      }
      arr.push(inst);
    }
  }
  return JSOG.decode(arr);
};

export const getTournamentModelRoot = (phrase) => {
  let graph = getTournamentModel(phrase);
  return graph[graph.length-1];
}

export const getActiveGames = (phrase) => {
  let model = getTournamentModelRoot(phrase);
  let games = [];
  let queue = [model];
  while (queue.length != 0) {
    let game = queue.pop();
    if (!game.winner || game.winner == "") {
      if (game.sides.home && game.sides.home.team && game.sides.home.team.name != "" && game.sides.visitor && game.sides.visitor.team && game.sides.visitor.team.name != "") {
        games.push(game);
      }else {
        if (!game.sides.home.team || game.sides.home.team.name == "")
          queue.push(game.sides.home.seed.sourceGame);
        if (!game.sides.visitor.team || game.sides.visitor.team.name == "")
          queue.push(game.sides.visitor.seed.sourceGame);
      }
    }
  }
  return games;
};

export const createTournament = (players) => {
  const processLevel = (arr) => {
    if (arr.length == 1)
      return arr[0];
    if (arr.length == 2)
      return arr;
    let halfway = Math.round(arr.length / 2);
    let first = processLevel(arr.slice(0,halfway));
    let second = processLevel(arr.slice(halfway, arr.length));
    return [first, second];
  };
  let bracketPlayers = processLevel(players);

  let gameArrs = [];
  let counter = 1;
  let playCounter = 101;
  const createStructure = (arr, level) => {
    if (gameArrs.length < level+1) {
      gameArrs.push({games:[]});
    }
    let home = {};
    if (arr[0].constructor === Array)
      home = { gameId: createStructure(arr[0], level + 1)};
    else
      home = {id: "" + playCounter++, name: arr[0]};
    let visitor = {};
    if (arr[1].constructor === Array)
      visitor = {gameId: createStructure(arr[1], level + 1)};
    else
      visitor = {id: "" + playCounter++, name: arr[1]};
    let game = {
      id: "" + counter++,
      leaf: (arr[0].constructor === Array || arr[1].constructor === Array) ? "false" : "true",
      home: home,
      visitor: visitor
    };
    gameArrs[level].games.push(game);
    return game.id;
  };
  createStructure(bracketPlayers, 0);
  gameArrs.reverse();

  //let privateName = Generate.generateName();
  Meteor.call('phrasegenerator',function(err, privatePhrase) {
    Meteor.call('phrasegenerator',function(err, publicPhrase) {
      let tourn = {
        tournamentTitle: "Tournament",
        tournamentPhrasePublic: publicPhrase,
        tournamentPhrasePrivate: privatePhrase,
        gameData: gameArrs
      };

      upsertTournament.call(tourn, (error, response) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert("Created", 'success');
          browserHistory.push('/tournament/' + privatePhrase);
        }
      });
    })
  });
};

export const gamePhraseType = (phrase) => {
    if (Tournaments.findOne({tournamentPhrasePublic: phrase})) {
        return 'public';
    } else if (Tournaments.findOne({tournamentPhrasePrivate: phrase})) {
        return 'private';
    } else {
        return null;
    }
};

rateLimit({
  methods: [
    upsertTournament,
    removeTournament,
  ],
  limit: 5,
  timeRange: 1000,
});
