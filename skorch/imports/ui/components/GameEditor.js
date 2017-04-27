/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import gameEditor from '../../modules/game-editor.js';

export default class GameEditor extends React.Component {
  componentDidMount() {
    Meteor.subscribe('gameModel.list');
    gameEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="gameTitle"]').focus(); }, 0);
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
        <FormControl
          type="text"
          name="modelName"
        />
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
