Blockly.JavaScript['modifier'] = function(block) {
  var btntext = block.getFieldValue('btnText');
  var alexaCommand = block.getFieldValue('alexaCommand');
  var code = Blockly.JavaScript.valueToCode(block, 'code', Blockly.JavaScript.ORDER_ATOMIC);
  return '{ "btnText": "' + btntext + '", "alexaCommand": "' + alexaCommand + '", "code": "' + code +'"},';
};

Blockly.JavaScript['counter'] = function(block) {
  var name = block.getFieldValue('name');
  var start = block.getFieldValue('start');
  var modifiers = Blockly.JavaScript.statementToCode(block, 'modifiers');
  modifiers = modifiers.substring(0, modifiers.length -1); //remove trailing comma
  return '{ "name":"' + name + '", "start": ' + start + ', "modifiers": [' + modifiers + ']}';
};

Blockly.JavaScript['thiscountervalue'] = function(block) {
  var code = 'this.value';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sumcounter'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['namedcounter'] = function(block) {
  var text_name = block.getFieldValue('name');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['game'] = function(block) {
  var text_numteams = block.getFieldValue('numTeams');
  var statements_playercounters = Blockly.JavaScript.statementToCode(block, 'playerCounters');
  var statements_teamcounters = Blockly.JavaScript.statementToCode(block, 'teamCounters');
  var statements_playerconditions = Blockly.JavaScript.statementToCode(block, 'playerConditions');
  var statements_teamconditions = Blockly.JavaScript.statementToCode(block, 'teamConditions');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['calculatedcounter'] = function(block) {
  var text_name = block.getFieldValue('name');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['namedcountervalue'] = function(block) {
  var text_name = block.getFieldValue('name');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['condition'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['win'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lose'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dqplayer'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['tagmyteam'] = function(block) {
  var text_tag = block.getFieldValue('tag');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['tagotherteam'] = function(block) {
  var text_tag = block.getFieldValue('tag');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
