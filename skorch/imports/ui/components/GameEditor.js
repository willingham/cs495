/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import gameEditor from '../../modules/game-editor.js';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import {getAllGameTitles} from '../../api/gameModel/methods';

export default class GameEditor extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.state.gameModels = ["test1", "test2"]
  }

  getModelNames() {
    return this.state.gameModels;
  }

  componentDidMount() {
    Meteor.subscribe('gameModel.list');
    gameEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="gameTitle"]').focus(); }, 0);
    const thisEditor = this;
    Meteor.call('getallgamemodelnames', function(err, modelNames) {
      thisEditor.setState({gameModels: modelNames});
    });
  }

  render() {
    const { doc } = this.props;
    return (<form
      ref={ form => (this.gameEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>Game Title</ControlLabel>
        <FormControl
          type="text"
          name="gameTitle"
          defaultValue={ doc && doc.gameTitle }
          placeholder="My awesome game"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Game Model</ControlLabel>
        <Link to={'/ModelEditor'}>
            <Button bsStyle="primary" className="modifier-button">
                <i className="fa fa-plus"></i>
            </Button>
        </Link>
        <br/>
        <Select2 data={this.getModelNames()} name="modelName" style={{width:200}} />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        { doc && doc._id ? 'Save Changes' : 'Add Game' }
      </Button>
    </form>);
  }
}


GameEditor.propTypes = {
  doc: React.PropTypes.object,
};
