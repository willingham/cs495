import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Alert, Table } from 'react-bootstrap';
import {AddPlayer} from '../../modules/game-functions.js';

export class AddPlayerComponent extends React.Component {
  componentDidMount() {
  }
  render () {
    const {game} = this.props;
    return(
      <div>
        <FormGroup>
          <ControlLabel>New Player Name</ControlLabel>
          <FormControl
            type="text"
            name="playerName"
            defaultValue=""
          />
        </FormGroup>
        <Button
          bsStyle="success"
          onClick={()=>AddPlayer({component:game})}
        >Add Player</Button>
      </div>
    )
  }
}
AddPlayerComponent.propTypes = {
  game: React.PropTypes.object,
};
