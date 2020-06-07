import React from "react";
import uuid from "react-uuid";

import Field from "../field";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectFieldArray,
  selectPlayerDiceNumber,
  selectPlayerStones,
  selectPlayerColor,
} from "../../redux/player/player.selectors";
import {
  setFieldArray,
  setPlayerColor,
  setDiceUrl,
  setStones,
} from "../../redux/player/player.action";
import { startRound, walking } from "../../utils/index";

import "./index.scss";

function PlayingField({
  updateFieldArray,
  updateDiceUrl,
  updatePlayerColor,
  updateStones,
  fieldArr,
  diceNum,
  playerColor,
  playerStones,
}) {
  let players = ["y", "b", "g", "r"];
  let numberThrown = diceNum;
  let canMove = false;
  let canMoveFromHome = false;
  let nextPlayer;

  const handleClick = (stone) => {
    if (stone.x[0].player === playerColor) {
      if (stone.location === "start" && diceNum === 6) {
        console.log(playerStones);
        let newArr = startRound(stone, fieldArr, playerColor, playerStones);
        updateFieldArray(newArr);
        if (diceNum !== 6) {
          players[players.length - 1] === playerColor
            ? (nextPlayer = players[0])
            : (nextPlayer = players[players.indexOf(playerColor) + 1]);
          updatePlayerColor(nextPlayer);
          updateDiceUrl("");
        }
        return;
      }
      console.log("lets walk");
      let newArr = walking(stone, fieldArr, playerColor, diceNum, playerStones);
      updateFieldArray(newArr);
      if (diceNum !== 6) {
        players[players.length - 1] === playerColor
          ? (nextPlayer = players[0])
          : (nextPlayer = players[players.indexOf(playerColor) + 1]);
        updatePlayerColor(nextPlayer);
        updateDiceUrl("");
      }
    }
  };

  return (
    <div className="playingfield">
      {fieldArr.map((row, rowIndex) => {
        return row.map((field, index) => {
          return (
            <>
              <Field
                key={uuid()}
                id={index}
                row={rowIndex}
                color={field.color ? field.color : field.x}
                field={field}
                onClick={field.x ? () => handleClick(field) : ""}
              />
            </>
          );
        });
      })}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateFieldArray: (field) => dispatch(setFieldArray(field)),
  updatePlayerColor: (color) => dispatch(setPlayerColor(color)),
  updateDiceUrl: (newDiceUrl) => dispatch(setDiceUrl(newDiceUrl)),
  updateStones: (newStones) => dispatch(setStones(newStones)),
});

const mapStateToProps = createStructuredSelector({
  fieldArr: selectFieldArray,
  playerColor: selectPlayerColor,
  playerStones: selectPlayerStones,
  diceNum: selectPlayerDiceNumber,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayingField);
