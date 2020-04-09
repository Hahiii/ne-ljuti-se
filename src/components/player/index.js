import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setPlayerColor, setStones } from '../../redux/player/player.action';
import { selectPlayerColor, selectPlayerStones, selectPlayerDiceNumber } from '../../redux/player/player.selectors';


import './index.scss';


const Players = ({ color, playerStones, PlayerColor, diceNum, updateStones }) => {
  // console.log("before", playerStones, player);
  if (diceNum === 6) {
    // console.log("hiiiii", diceNum);

    let temp = playerStones

    updateStones('down');
  }
  return (
    <div className={`player ${color}`} onClick={() => PlayerColor(color)}>
      <span className="stone"></span>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  PlayerColor: (color) => dispatch(setPlayerColor(color)),
  updateStones: (payload) => dispatch(setStones(payload))
});

const mapStateToProps = createStructuredSelector({
  playerColor: selectPlayerColor,
  playerStones: selectPlayerStones,
  diceNum: selectPlayerDiceNumber
});


export default connect(mapStateToProps, mapDispatchToProps)(Players);