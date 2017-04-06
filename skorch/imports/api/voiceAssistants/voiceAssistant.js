import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/dburles:factory';

const VoiceAssistant = new Mongo.Collection('VoiceAssistant');
export default VoiceAssistant;

VoiceAssistant.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

VoiceAssistant.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

VoiceAssistant.schema = new SimpleSchema({
  _id: {type:String, optional:true},
  AssistantId: {type:String, optional:false},
  GameId: {type:String, optional:false},
  GamePhrase: {type:String, optional:false}
});

VoiceAssistant.attachSchema(VoiceAssistant.schema);
