import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

const handleNav = (game) => {
  browserHistory.push(`/game/${game}`);
}

const MyGamesList = ({ games }) => (
  games.length > 0 ? <ListGroup className="MyGames">
    {games.map((game) => (
      <ListGroupItem key={ game } onClick={ () => handleNav(game) }>
        { game }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No games yet.</Alert>
);

MyGamesList.propTypes = {
  games: React.PropTypes.array,
};

export default MyGamesList;
