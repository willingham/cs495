/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import gameEditor from '../../modules/game-editor.js';

export default class GameEditor extends React.Component {
  componentDidMount() {
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
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Game Type</ControlLabel>
        <FormControl componentClass="select" placeholder="select game type" name="gameType">
          <option>select</option>
          <option value="leaderboard">Leaderboard</option>
          <option value="gameType1">Game Type 1</option>
          <option value="gameType2">Game Type 2</option>
          <option value="other">...</option>
        </FormControl>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Public Game Phrase</ControlLabel>
        <FormControl
          type="text"
          name="gamePhrasePublic"
          defaultValue={ doc && doc.gamePhrasePublic }
          placeholder="jubilantPrancingReindeer"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Private Game Phrase</ControlLabel>
        <FormControl
          type="text"
          name="gamePhrasePrivate"
          defaultValue={ doc && doc.gamePhrasePrivate }
          placeholder="awkwardRedGoat"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>gameWinner</ControlLabel>
        <FormControl
          type="text"
          name="gameWinner"
          defaultValue={ doc && doc.gameWinner }
          placeholder="If ya ain't first, yer last!"
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
