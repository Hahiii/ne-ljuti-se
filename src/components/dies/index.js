import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setDiceNumber } from '../../redux/player/player.action';
import { selectPlayerColor, selectPlayerStones, selectPlayerDiceNumber } from '../../redux/player/player.selectors';

import './index.scss';

import one from '../../images/one.png'
import two from '../../images/two.png'
import three from '../../images/three.png'
import four from '../../images/four.png'
import five from '../../images/five.png'
import six from '../../images/six.png'

function Dice({ playerColor, playerStones, throwDice, diceNum }) {
  const [animation, setAnimation] = useState(false)
  let number = 0;
  let thrownNumber = diceNum;
  let click = false;
  let diceUrl = {
    "1": one,
    "2": two,
    "3": three,
    "4": four,
    "5": five,
    "6": six
  }
  const handleClick = () => {
    setAnimation(true);
    let thrownNumber = diceNum;
    if (playerStones[playerColor].stones.length === 4) {
      let i = 0;
      while (i < 3) {
        number = Math.ceil(Math.random() * 6)
        console.log("dice");
        if (number === 6) {
          i = 3;
        }
        i++;
      }
    } else if (playerStones[playerColor].stones.length < 4) {
      number = Math.ceil(Math.random() * 6)
    }
    throwDice(number)
  }
  return (
    <div
      className={`dies ${playerColor}`}
      onClick={() => { handleClick() }}>
      <span
        className={`${playerColor} ${animation ? "animation" : null} four`}
        onAnimationEnd={() => setAnimation(false)}
      >
        {diceNum ? <img src={diceUrl[`${thrownNumber}`]} alt={thrownNumber} /> : "Throw"}
      </span>
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