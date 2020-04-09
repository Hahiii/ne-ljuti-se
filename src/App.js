import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

// import { setPlayerColor } from '../../redux/player/player.action';
import { selectPlayerColor, selectPlayerStones } from './redux/player/player.selectors';



import './App.css';

import PlayingField from './components/PlayingField';
import Dice from './components/dies';


function App({ playerColor }) {
  return (
    <div className="App">
      <div>
        <h1>Player: <span style={{ color: playerColor }}>{playerColor}</span></h1>
        {playerColor && <Dice
          playing={playerColor ? playerColor : ""}
        // stones={stones}
        // gotSix={(updateStones) => setStones(updateStones)}
        />
        }
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

