import '../../api/documents/methods.js';
import '../../api/documents/server/publications.js';
import '../../api/games/methods.js';
import '../../api/games/server/publications.js';
import '../../api/user/methods.js';
import '../../api/user/server/publications.js';
import '../../api/gameModel/methods.js';
import '../../api/gameModel/server/publications.js';
import {Restivus} from 'meteor/nimble:restivus';
import {getGameByPhraseAll, getGameById, upsertGame} from '../../api/games/methods';
import {upsertVoiceAssistant, removeVoiceAssistant, findVoiceAssistantById} from '../../api/voiceAssistants/methods';
import {getGameModelByTitle} from '../../api/gameModel/methods';

if (Meteor.isServer) {
  var Api = new Restivus({
    prettyJson:true,
    //APIPATH: 'alexa/'
  });

  const handleModifier = (code, value) => {
    const toEval = "(function() { return " + code + ";})"
    const fn = eval(toEval).bind({value: value});
    return fn();
  }

  const updatePlayerCounter = (gameId, teams, info, value) => {
    teams = teams.slice();
    //teams[info.teamId].players[info.playerId].counters[info.counterId].value = value;
    teams.forEach((team)=> {
      if (team.name === info.teamName) {
        team.players.forEach((player) => {
          if (player.name === info.playerName) {
            player.counters.forEach((counter) => {
              if (counter.name === info.counterName) {
                counter.value = value;
              }
            })
          }
        })

      }
    });
    const upsert = {
      _id: gameId,
      teams: teams
    };
    upsertGame.call(upsert, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
  }

  const updateTeamCounter = (gameId, teams, info, value) => {
    teams = teams.slice();
    //teams[info.teamId].counters[info.counterId].value = value;
    teams.forEach((team)=> {
      if (team.name === info.teamName) {
        team.counters.forEach((counter) => {
          if (counter.name === info.counterName) {
            counter.value = value;
          }
        })
      }
    });
    const upsert = {
      _id: gameId,
      teams: teams
    };
    upsertGame.call(upsert, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
  }

  Api.addRoute('test/', {}, {
    get:function() {
      return 'GET';
    },
    post:function() {
      return 'POST';
    }
  })

  Api.addRoute('join/', {}, {
    post:function(){
      console.log("Joining");
      console.log(this.bodyParams);
      if (!("alexa_id" in this.bodyParams)) {
        return "An Error Occurred.";
      }
      if (!("game_phrase" in this.bodyParams)) {
        return "Did not detect a game phrase.";
      }

      let phrase = this.bodyParams["game_phrase"].value;
      phrase = phrase.split(" ").join("");
      console.log(phrase);
      let game = getGameByPhraseAll(phrase);

      if (!game) {
        return "Could not find a game with that phrase";
      }

      upsertVoiceAssistant({
        AssistantId: this.bodyParams["alexa_id"],
        GameId: game._id,
        GamePhrase: phrase
      });

      return "Successfully joined game";
    }
  });

  Api.addRoute('leave/', {}, {
    post:function() {
      console.log("Leaving");
      console.log(this.bodyParams);
      if (!("alexa_id" in this.bodyParams)) {
        return "An Error Occurred.";
      }

      const assistant = findVoiceAssistantById(this.bodyParams["alexa_id"]);
      console.log(assistant);
      if (!assistant) {
        return "This assistant is not currently attached to a game.";
      }

      removeVoiceAssistant(this.bodyParams["alexa_id"]);
      return "Disconnected from game.";
    }
  });

  Api.addRoute('update/', {}, {
    post:function() {
      console.log("Updating");
      console.log(this.bodyParams);
      if (!("alexa_id" in this.bodyParams)) {
        return "An Error Occurred.";
      }

      const assistant = findVoiceAssistantById(this.bodyParams["alexa_id"]);
      if (!assistant) {
        return "This assistant is not currently attached to a game";
      }

      const game = getGameById(assistant.GameId);
      if (!game) {
        return "Could not load game";
      }

      let entityName = this.bodyParams["entity"].value.toLowerCase();
      let command = this.bodyParams["action"].value.toLowerCase();
      let foundPerson = false;
      let appliedChange = false;
      game.teams.forEach((team) => {
        if (team.name.toLowerCase() === entityName) {
          foundPerson = true;
          team.counters.forEach((counter) => {
            counter.modifiers.forEach((modifier) => {
              if (modifier.alexaCommand && modifier.alexaCommand.toLowerCase() === command) {
                //apply action
                updateTeamCounter(game._id,
                  game.teams,
                  {teamName: team.name, counterName: counter.name },
                  handleModifier(modifier.code, counter.value));
                appliedChange = true;
              }
            })
          });
          return;
        }
        team.players.forEach((player) => {
          if (player.name.toLowerCase() === entityName) {
            foundPerson = true;
            //apply action
            player.counters.forEach((counter) => {
              counter.modifiers.forEach((modifier) => {
                if (modifier.alexaCommand && modifier.alexaCommand.toLowerCase() === command) {
                  //apply action
                  updatePlayerCounter(game._id,
                    game.teams,
                    {teamName: team.name, playerName: player.name, counterName: counter.name},
                    handleModifier(modifier.code, counter.value));
                  appliedChange = true;
                }
              })
            })
          }
        })
      });

      if (!foundPerson) {
        return "Could not find person";
      }
      if (appliedChange)
        return "Changes made";
      else
        return "Could not find action";
    }
  })
  Api.addRoute('query/', {}, {
    post:function() {
      console.log("Querying");
      console.log(this.bodyParams);
      if (!("alexa_id" in this.bodyParams)) {
        return "An Error Occurred.";
      }

      const assistant = findVoiceAssistantById(this.bodyParams["alexa_id"]);
      if (!assistant) {
        return "This assistant is not currently attached to a game";
      }

      const game = getGameById(assistant.GameId);
      if (!game) {
        return "Could not load game.";
      }
      let counterName = this.bodyParams["counter"].value.toLowerCase();
      let response = "";
      let entityName = this.bodyParams["entity"].value.toLowerCase();
      let foundPerson = false;
      let foundValue = false;
      game.teams.forEach((team) => {
        console.log("Searching team " + team.name);
        if (team.name.toLowerCase() === entityName) {
          foundPerson = true;
          team.counters.forEach((counter) => {
            if (counter.name.toLowerCase() === counterName) {
              response = counter.value;
              foundValue = true;
            }
          });
          return;
        }
        team.players.forEach((player) => {
          console.log("Searching player " + player.name + " in team " + team.name);
          if (player.name.toLowerCase() === entityName) {
            foundPerson = true;
            //apply action
            player.counters.forEach((counter) => {
              if (counter.name.toLowerCase() === counterName) {
                response = counter.value;
                foundValue = true;
              }
            })
          }
        })
      });

      if (foundValue)
        return entityName + "'s " + counterName + " is " + response;
      else if (!foundPerson)
        return "Could not find player or team name";
      else
        return "Could not find query.";

    }
    }
  )


}
