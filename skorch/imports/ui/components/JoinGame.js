import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {IsValidGamePhrase} from '../../modules/game-functions.js';

const checkPhraseAndJoin = () => {
  const phrase = document.querySelector('[name="gamePhrase"]').value.trim();
  if (IsValidGamePhrase(phrase)) {
    browserHistory.push(`/play/${phrase}`);
  } else {
    Bert.alert("Game Phrase Not Found", 'danger');
  }
};

export class JoinGameComponent extends React.Component {
  componentDidMount(){
  }
  render() {
    return(
      <div>
        <FormGroup>
          <ControlLabel>Game Phrase</ControlLabel>
          <FormControl
            type="text"
            name="gamePhrase"
            defaultValue=""
            />
        </FormGroup>
        <Button
          bsStyle="success"
          onClick={()=>checkPhraseAndJoin()}
        >Join</Button>
      </div>
    )
  }
}
