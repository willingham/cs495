import React from 'react';
import GameEditor from '../components/GameEditor.js';

const EditGame = ({ doc }) => (
  <div className="EditGame">
    <h4 className="page-header">Editing "{ doc.gameTitle }"</h4>
    <GameEditor doc={ doc } />
  </div>
);

EditGame.propTypes = {
  doc: React.PropTypes.object,
};

export default EditGame;
