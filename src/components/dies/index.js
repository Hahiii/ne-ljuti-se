import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setDiceNumber, setPlayerColor, setDiceUrl } from '../../redux/player/player.action';
import { selectPlayerColor, selectPlayerStones, selectDiceUrl } from '../../redux/player/player.selectors';

import './index.scss';
import zero from '../../images/zero.png'
import one from '../../images/one.png'
import two from '../../images/two.png'
import three from '../../images/three.png'
import four from '../../images/four.png'
import five from '../../images/five.png'
import six from '../../images/six.png'

function Dice({ updatePlayerColor, updateDiceUrl, playerColor, playerStones, throwDice, diceUrl }) {
  const [animation, setAnimation] = useState(false);
  let number = 0;
  let diceUrlArr = {
    "0": zero,
    "1": one,
    "2": two,
    "3": three,
    "4": four,
    "5": five,
    "6": six
  }
  const handleClick = () => {
    let stonesAtHome = playerStones[playerColor].stones.filter((item) => item.steps === 0);
    let players = ["y", "b", "g", "r"];
    let nextPlayer;

    setAnimation(true);
    if (stonesAtHome.length === 4) {
      let i = 0;
      while (i < 3) {
        number = Math.ceil(Math.random() * 6);
        if (number === 6) {
          i = 3;
        }
        i++;
      }
      if (number !== 6) {
        setTimeout(() => {
          updateDiceUrl("")
          players[players.length - 1] === playerColor ? nextPlayer = players[0] : nextPlayer = players[players.indexOf(playerColor) + 1];
          updatePlayerColor(nextPlayer)
        }, 2000)
      }
    } else {
      number = Math.ceil(Math.random() * 6)
    }
    throwDice(number)
    setTimeout(() => {
      updateDiceUrl(getDiceNumberUrl(number))
    }, 1200);
  }
  const getDiceNumberUrl = (num) => {
    return diceUrlArr[`${num}`];
  }
  return (
    <div
      className={`dies ${playerColor} ${animation ? "animation" : null}`}
      onClick={() => { handleClick() }}>
      <span
        className={`${playerColor} ${animation ? "animation" : null}`}
        onAnimationEnd={() => setAnimation(false)}
      >
        <img src={diceUrl ? diceUrl : zero} alt={diceUrl.toString()} />
      </span>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  throwDice: (num) => dispatch(setDiceNumber(num)),
  updatePlayerColor: (color) => dispatch(setPlayerColor(color)),
  updateDiceUrl: (newDiceUrl) => dispatch(setDiceUrl(newDiceUrl))
});

const mapStateToProps = createStructuredSelector({
  playerColor: selectPlayerColor,
  playerStones: selectPlayerStones,
  diceUrl: selectDiceUrl
});


export default connect(mapStateToProps, mapDispatchToProps)(Dice);