Blockly.JavaScript['modifier'] = function(block) {
  var btntext = block.getFieldValue('btnText');
  var alexaCommand = block.getFieldValue('alexaCommand');
  var code = Blockly.JavaScript.valueToCode(block, 'code', Blockly.JavaScript.ORDER_ATOMIC);
  return '{"btnText":"' + btntext + '","alexaCommand":"' + alexaCommand + '","code":"' + code +'"},';
};

Blockly.JavaScript['counter'] = function(block) {
  var name = block.getFieldValue('name');
  var start = block.getFieldValue('start');
  var modifiers = Blockly.JavaScript.statementToCode(block, 'modifiers');
  modifiers = '[' + modifiers.substring(0, modifiers.length -1) + ']'; //make valid array
  return '{"name":"' + name + '","start":' + start + ',"modifiers":' + modifiers + '},';
};

Blockly.JavaScript['thiscountervalue'] = function(block) {
  var code = 'this.value';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sumcounter'] = function(block) {
  var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '(sumCounter(\'' + name + '\', this))';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['namedcounter'] = function(block) {
  var name = block.getFieldValue('name');
  return [name, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['game'] = function(block) {
  var numTeams = block.getFieldValue('numTeams');
  var playerCounters = Blockly.JavaScript.statementToCode(block, 'playerCounters');
  playerCounters = '[' + playerCounters.substring(0, playerCounters.length -1) + ']'; //make valid array
  var teamCounters = Blockly.JavaScript.statementToCode(block, 'teamCounters');
  teamCounters = '[' + teamCounters.substring(0, teamCounters.length -1) + ']'; //make valid array
  var playerConditions = Blockly.JavaScript.statementToCode(block, 'playerConditions');
  playerConditions = '[' + playerConditions.substring(0, playerConditions.length -1) + ']'; //make valid array
  var teamConditions = Blockly.JavaScript.statementToCode(block, 'teamConditions');
  teamConditions = '[' + teamConditions.substring(0, teamConditions.length -1) + ']'; //make valid array

  var code = '{ "numTeams":' + numTeams + ',' +
        '"playerCounters":' + playerCounters + ',' + 
        '"teamCounters":' + teamCounters + ',' + 
        '"playerConditions":' + playerConditions + ',' + 
        '"teamConditions":' + teamConditions + 
        '}';
  return code;
};

Blockly.JavaScript['calculatedcounter'] = function(block) {
  var name = block.getFieldValue('name');
  var code = Blockly.JavaScript.valueToCode(block, 'code', Blockly.JavaScript.ORDER_ATOMIC);
  return '{"name":"' + name +'","code":"' + code + '"},';
};

Blockly.JavaScript['namedcountervalue'] = function(block) {
  var name = block.getFieldValue('name');
  var code = '(getCounterValue(\'' + name + '\', this))';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['condition'] = function(block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"condition":"' + condition + '","result":"' + result + '"},';
  return code;
};

Blockly.JavaScript['win'] = function(block) {
  var code = 'win(this)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['lose'] = function(block) {
  var code = 'lose(this)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dqplayer'] = function(block) {
  var code = 'dqplayer(this)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['tagmyteam'] = function(block) {
  var tag = block.getFieldValue('tag');
  var code = 'tag(this,\'' + tag + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['tagotherteam'] = function(block) {
  var tag = block.getFieldValue('tag');
  var code = 'tagOtherTeam(this,\'' + tag + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
