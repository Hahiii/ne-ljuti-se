import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

// import { setPlayerColor } from '../../redux/player/player.action';
import { selectPlayerColor } from './redux/player/player.selectors';



import './App.scss';

import PlayingField from './components/PlayingField';
import Player from './components/player/';
import Dice from './components/dies';

function App({ playerColor }) {
  return (
    <div className="App">
      <div className="player-container">
        <h1>Player: < Player color={playerColor} /></h1>
      </div>
      <div>
        <Dice />
      </div>
      <PlayingField
        playerIs={playerColor}
      />
    </div>
  );
}

// const mapDispatchToProps = dispatch => ({
//   PlayerColor: (color) => dispatch(setPlayerColor(color))
// });

const mapStateToProps = createStructuredSelector({
  playerColor: selectPlayerColor,
});


export default connect(mapStateToProps, null)(App);

