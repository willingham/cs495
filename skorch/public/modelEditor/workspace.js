var toolbox = document.getElementById("toolbox");

var options = { 
	toolbox : toolbox, 
	collapse : false, 
	comments : false, 
	disable : false, 
	maxBlocks : Infinity, 
	trashcan : true, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
	media : 'https://blockly-demo.appspot.com/static/media/', 
	rtl : false, 
	scrollbars : true, 
	sounds : false, 
	oneBasedIndex : false
};

var workspace = Blockly.inject('blockly', options);

var workspaceBlocks = document.getElementById("workspaceBlocks"); 

Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
