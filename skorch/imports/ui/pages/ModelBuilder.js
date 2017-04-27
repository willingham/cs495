import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import { upsertGameModel } from '../../api/gameModel/methods.js'
import { Bert } from 'meteor/themeteorchef:bert';

class ModelBuilder extends React.Component {
    constructor() {
        super();
        this._onWindowResize = this._onWindowResize.bind(this);
        this.insertGame = this.insertGame.bind(this);
    }

    insertGame() {
        let model = JSON.parse(Blockly.JavaScript.workspaceToCode(this._workspace));
        console.log(upsertGameModel);
        model.title = prompt("Whatchu wanna call this thing?");
        upsertGameModel.call(model, (error, response) => { 
            if (error) {
                console.log(error);
            } 
        });
    }

    componentDidMount() {
        this._blocklyDiv = document.getElementById('blockly-component');
        this._blocklyArea = document.getElementById('blockly-area');
        this._toolbox = document.getElementById("toolbox");

        this._options = { 
            toolbox : toolbox, 
            collapse : false, 
            comments : false, 
            disable : false, 
            maxBlocks : Infinity, 
            trashcan : true, 
            horizontalLayout : false, 
            toolboxPosition : 'start', 
            css : true, 
            media : 'blockly/media/', 
            rtl : false, 
            scrollbars : true, 
            sounds : false, 
            oneBasedIndex : false
        };

        $(document).ready((() => {
            this._workspace = Blockly.inject(this._blocklyDiv, this._options);

            this._workspaceBlocks = document.getElementById("workspaceBlocks"); 

            Blockly.Xml.domToWorkspace(workspaceBlocks, this._workspace);

            window.addEventListener('resize', this._onWindowResize, false);
            this._onWindowResize();
            Blockly.svgResize(this._workspace);
        }).bind(this));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        return (
            <div>
                <div className="page-header clearfix">
                    <h4 className="pull-left">Game Model Builder</h4>
                    <Button onClick={ this.insertGame } bsStyle="success" className="pull-right" >Save Model</Button>
                </div>
                <div id="blockly-area">
                    <div id="blockly-component"></div>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._onWindowResize, false);
    }

    _onWindowResize(event) {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        let element = this._blocklyArea;
        let x = 0;
        let y = 0;

        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);

        // Position blocklyDiv over blocklyArea.
        this._blocklyDiv.style.left = x + 'px';
        this._blocklyDiv.style.top = y + 'px';
        this._blocklyDiv.style.width = this._blocklyArea.offsetWidth + 'px';
        this._blocklyDiv.style.height = this._blocklyArea.offsetHeight + 'px';
	}
}

export default ModelBuilder;
