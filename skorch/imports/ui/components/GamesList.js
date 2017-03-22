import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

const handleNav = (_id) => {
  browserHistory.push(`/games/${_id}`);
}

const GamesList = ({ games }) => (
  games.length > 0 ? <ListGroup className="GamesList">
    {games.map(({ _id, gameTitle }) => (
      <ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
        { gameTitle }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No games yet.</Alert>
);

GamesList.propTypes = {
  games: React.PropTypes.array,
};

export default GamesList;
