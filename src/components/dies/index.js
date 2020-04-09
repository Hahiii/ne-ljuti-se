import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setDiceNumber } from '../../redux/player/player.action';
import { selectPlayerColor, selectPlayerStones, selectPlayerDiceNumber } from '../../redux/player/player.selectors';

import './index.scss';

function Dice({ playerColor, playerStones, throwDice, diceNum }) {
  let number;
  let thrownNUmber = diceNum;
  const handleClick = () => {
    if (playerStones[playerColor].stones.length === 4) {
      let i = 0;
      while (i < 3) {
        number = Math.ceil(Math.random() * 6)
        if (number === 6) {
          // setNum(number)
          // stones = stones.slice(0, stones.length - 1)
          // gotSix(stones)
          i = 3;
        }
        i++;
      }
    } else if (playerStones[playerColor].stones.length < 4) {
      number = Math.ceil(Math.random() * 6)

      // if (num === 6) {
      //   stones = stones.slice(0, stones.length - 1)

      // }
    }
    throwDice(number)
  }
  return (
    <div className={`dies ${playerColor}`} onClick={() => {
      handleClick()
      }}>
      {diceNum ? thrownNUmber : "throw"}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  throwDice: (num) => dispatch(setDiceNumber(num))
});

const mapStateToProps = createStructuredSelector({
  playerColor: selectPlayerColor,
  playerStones: selectPlayerStones,
  diceNum: selectPlayerDiceNumber
});


export default connect(mapStateToProps, mapDispatchToProps)(Dice);