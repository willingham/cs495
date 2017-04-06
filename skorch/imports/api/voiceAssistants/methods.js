import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import VoiceAssistant from './voiceAssistant';
import rateLimit from '../../modules/rate-limit.js';

/*export const upsertVoiceAssistant = new ValidatedMethod({
  name: 'voiceAssistant.upsert',
  validate: VoiceAssistant.schema.validator(),
  run(model) {
    let _id = model._id;
    if (model._id) delete model._id;
    return VoiceAssistant.upsert({ _id: _id }, { $set: model });
  },
});*/

export const upsertVoiceAssistant = (model) => {
  let _id = model._id;
  if (model._id) delete model._id;
  return VoiceAssistant.upsert({ _id: _id }, { $set: model });
};

export const removeVoiceAssistant = (id) => {
  VoiceAssistant.remove(id);
};

export const findVoiceAssistantById = (id) => {
  return VoiceAssistant.findOne({_id:id});
};

rateLimit({
  methods: [
      upsertVoiceAssistant,
  ],
  limit: 5,
  timeRange: 1000,
});
