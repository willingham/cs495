import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import GamesList from '../containers/GamesList.js';

const Games = () => (
  <div className="Games">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Games</h4>
          <Link to="/games/new">
            <Button
              bsStyle="success"
              className="pull-right"
            >New Game</Button>
          </Link>
        </div>
        <GamesList />
      </Col>
    </Row>
  </div>
);

export default Games;
