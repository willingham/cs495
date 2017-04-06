import '../../api/documents/methods.js';
import '../../api/documents/server/publications.js';
import '../../api/games/methods.js';
import '../../api/games/server/publications.js';
import '../../api/user/methods.js';
import '../../api/user/server/publications.js';
import {Restivus} from 'meteor/nimble:restivus';
import {getGameByPhraseAll, getGameById} from '../../api/games/methods';
import {upsertVoiceAssistant, removeVoiceAssistant, findVoiceAssistantById} from '../../api/voiceAssistants/methods';
import {getGameModelByName} from '../../api/gameModel/methods';

if (Meteor.isServer) {
  var Api = new Restivus({
    prettyJson:true,
    //APIPATH: 'alexa/'
  });

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

      const gameModel = getGameModelByName(game.gameType);
      let command = this.bodyParams["action"].value;
      let appliedChange = false;
      let foundPerson = false;

      gameModel.model.playerCounters.forEach((counter) => {
        counter.modifiers.forEach((modifier) => {
          if (modifier.alexaCommand && modifier.alexaCommand.toLowerCase() === command) {
            let action = modifier.code;
            appliedChange = true;

            game.gameData.players.forEach((player)=>{
              if (player.player.toLowerCase() === this.bodyParams["entity"].value) {
                //apply action to player.scores[counter.name]
                foundPerson = true;
              }
            })
          }
        })
      });
      //do to team modifiers also

      if (!foundPerson) {
        return "Could not find person";
      }
      if (appliedChange)
        return "Changes made";
      else
        return "Could not find action";
    }
  })
}
