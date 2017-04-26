/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
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
        <FormControl
          type="text"
          name="modelName"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Public Game Phrase</ControlLabel>
        <FormControl
          type="text"
          name="publicGamePhrase"
          defaultValue={ doc && doc.gamePhrasePublic }
          placeholder="jubilantPrancingReindeer"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Private Game Phrase</ControlLabel>
        <FormControl
          type="text"
          name="privateGamePhrase"
          defaultValue={ doc && doc.gamePhrasePrivate }
          placeholder="awkwardRedGoat"
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
