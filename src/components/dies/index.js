import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setDiceNumber } from '../../redux/player/player.action';
import { selectPlayerColor, selectPlayerStones, selectPlayerDiceNumber } from '../../redux/player/player.selectors';

import './index.scss';
import zero from '../../images/zero.png'
import one from '../../images/one.png'
import two from '../../images/two.png'
import three from '../../images/three.png'
import four from '../../images/four.png'
import five from '../../images/five.png'
import six from '../../images/six.png'

function Dice({ playerColor, playerStones, throwDice, diceNum }) {
  const [animation, setAnimation] = useState(false);
  const [url, setUrl] = useState(zero);
  let number = 0;
  let diceUrl = {
    "1": one,
    "2": two,
    "3": three,
    "4": four,
    "5": five,
    "6": six
  }
  const handleClick = () => {
    setUrl(zero);
    let thrownNumber = diceNum;
    setAnimation(true);
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
    setTimeout(() => {
      setUrl(getDiceNumberUrl(number))
    }, 1200);
  }
  const getDiceNumberUrl = (num) => {
    return diceUrl[`${num}`];
  }
  return (
    <div
      className={`dies ${playerColor} ${animation ? "animation" : null}`}
      onClick={() => { handleClick() }}>
      <span
        className={`${playerColor} ${animation ? "animation" : null}`}
        onAnimationEnd={() => setAnimation(false)}
      >
        <img src={url} alt={"dice number"} />
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