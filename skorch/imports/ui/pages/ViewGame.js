import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeGame } from '../../api/games/methods.js';

const handleEdit = (_id) => {
  browserHistory.push(`/games/${_id}/edit`);
}

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeGame.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Game deleted!', 'success');
        browserHistory.push('/games');
      }
    });
  }
};

const ViewGame = ({ doc }) => (
  <div className="ViewGame">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ doc && doc.gameTitle }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={ () => handleEdit(doc._id) }>Edit</Button>
          <Button onClick={ () => handleRemove(doc._id) } className="text-danger">Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <h5>Type: { doc && doc.gameType }</h5>
    <h5>Public Game Phrase: { doc && doc.gamePhrasePublic }</h5>
    <h5>Private Game Phrase: { doc && doc.gamePhrasePrivate }</h5>
    <h5>Winner: { doc && doc.gameWinner }</h5>
  </div>
);

ViewGame.propTypes = {
  doc: React.PropTypes.object,
};

export default ViewGame;
