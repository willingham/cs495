Blockly.Blocks['modifier'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Button Text")
        .appendField(new Blockly.FieldTextInput("text"), "btnText");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Alexa Command")
        .appendField(new Blockly.FieldTextInput("command"), "alexaCommand");
    this.appendValueInput("code")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Set counter to");
    this.setPreviousStatement(true, "modifier");
    this.setNextStatement(true, "modifier");
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['counter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("name")
        .appendField(new Blockly.FieldTextInput("name"), "name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("starting value")
        .appendField(new Blockly.FieldNumber(0), "start");
    this.appendStatementInput("modifiers")
        .setCheck("modifier")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("modifiers");
    this.setPreviousStatement(true, "counter");
    this.setNextStatement(true, "counter");
    this.setColour(135);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['thiscountervalue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("this counter value");
    this.setOutput(true, "Number");
    this.setColour(225);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['sumcounter'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("counterName")
        .appendField("Sum of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['namedcounter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("name"), "name")
        .appendField("counter");
    this.setOutput(true, "counterName");
    this.setColour(135);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['game'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Create a game with")
        .appendField(new Blockly.FieldTextInput("2"), "numTeams")
        .appendField("teams");
    this.appendStatementInput("playerCounters")
        .setCheck("counter")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("with player counters");
    this.appendStatementInput("teamCounters")
        .setCheck("counter")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("with team counters");
    this.appendStatementInput("playerConditions")
        .setCheck("condition")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("with player conditions");
    this.appendStatementInput("teamConditions")
        .setCheck("condition")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("with team conditions");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['calculatedcounter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("name")
        .appendField(new Blockly.FieldTextInput("name"), "name");
    this.appendValueInput("code")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("value");
    this.setPreviousStatement(true, "counter");
    this.setNextStatement(true, "counter");
    this.setColour(135);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['namedcountervalue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("name"), "name")
        .appendField("counter value");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['condition'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("when");
    this.appendValueInput("result")
        .setCheck("event")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("do");
    this.setPreviousStatement(true, "condition");
    this.setNextStatement(true, "condition");
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['win'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("win");
    this.setOutput(true, "event");
    this.setColour(315);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['lose'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("lose");
    this.setOutput(true, "event");
    this.setColour(315);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['dqplayer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("disqualify player");
    this.setOutput(true, "event");
    this.setColour(315);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['tagmyteam'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("tag me")
        .appendField(new Blockly.FieldTextInput("tag"), "tag");
    this.setOutput(true, "event");
    this.setColour(315);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['tagotherteam'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("tag other teams")
        .appendField(new Blockly.FieldTextInput("tag"), "tag");
    this.setOutput(true, "event");
    this.setColour(315);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
