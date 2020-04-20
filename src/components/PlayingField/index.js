import React, { useState } from 'react';

import Field from '../field';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFieldArray, selectPlayerDiceNumber, selectPlayerStones, selectPlayerColor } from '../../redux/player/player.selectors';
import { setFieldArray, setPlayerColor, setDiceUrl } from '../../redux/player/player.action';

import './index.scss';

function PlayingField({ updateFieldArray, updateDiceUrl, updatePlayerColor, fieldArr, diceNum, playerColor, playerStones }) {
  let players = ["y", "b", "g", "r"];
  let numberThrown = diceNum;
  let canMove = false;
  let canMoveFromHome = false;
  let nextPlayer;
  const newArr = [...fieldArr];

  const handleClick = (stone) => {
    let playerFigures = [...playerStones[stone.type].stones];
    if (stone.type === playerColor && diceNum) {
      let fieldClicked = newArr[stone.row][stone.index];

      newArr.map((row, indexRow) => {
        row.map((fields, indexFields) => {
          if (fields.start === stone.type && playerFigures[stone.stoneid - 1].steps === 0 && diceNum === 6) {
            let xArr = fields.x !== "" ? fields.x.filter((item) => item.x === stone.type) : [];
            if (!xArr.length || fields.start === stone.type && fields.x === "") {
              if (fields.x.length) {
                if (kickPlayerAtHome(fields, fieldClicked)) {
                  fields = { ...fields, x: [{ x: fieldClicked.x, stoneId: fieldClicked.stoneId }] };
                  newArr[indexRow][indexFields] = { ...fields };
                  playerFigures[stone.stoneid - 1].steps = 1;
                  canMove = true;
                  return;
                }
              }
              console.log("i got a 6");
              fields.x.push({ x: fieldClicked.x, stoneId: fieldClicked.stoneId })
              fields = { ...fields, x: [...fields.x,] };
              // fieldClicked = { ...fieldClicked, x: "" };
              newArr[indexRow][indexFields] = { ...fields };
              console.log(stone.stoneid);
              playerFigures[stone.stoneid - 1].steps = 1;
              console.log("after playing the 6", newArr[indexRow][indexFields]);
              canMove = true;
              return;
            }
          }
          if (playerFigures[stone.stoneid - 1].steps + diceNum <= 40) {
            if (fields.p === (fieldClicked.p + numberThrown) || fields.p === (fieldClicked.p + numberThrown) - 40 && fields.x !== stone.type) {
              if (fields.x === "" && !Array.isArray(fields.x)) {
                if (Array.isArray(fieldClicked.x)) {
                  // console.log("i clicked on a obj", newArr[stone.row][stone.index], stone);
                  fields = { ...fields, x: stone.type, stoneId: stone.stoneid };
                  newArr[indexRow][indexFields] = { ...fields };
                  canMove = true;
                  canMoveFromHome = true;
                  console.log(stone.stoneid);
                  playerFigures[stone.stoneid - 1].steps += diceNum;

                  return;
                };
                fields = { ...fields, x: stone.type, stoneId: stone.stoneid };
                newArr[indexRow][indexFields] = { ...fields };
                canMove = true;
                console.log(stone.stoneid);
                playerFigures[stone.stoneid - 1].steps += diceNum;
                return;
              }
              if (fields.x !== "") {
                if (kickPlayerWalking(fields, stone)) {
                  canMove = true;
                }
              }
              if (Array.isArray(fields.x)) {
                console.log("next field is obj");
                fields.x.push({ x: fieldClicked.x, stoneId: fieldClicked.stoneId })
                fields = { ...fields, x: [...fields.x,] };
                newArr[indexRow][indexFields] = { ...fields };
                canMove = true;
                console.log(playerFigures[stone.stoneid - 1].steps, diceNum, "=");
                playerFigures[stone.stoneid - 1].steps += diceNum;

                return;
              }
            }
          } else {
            let homePosition = playerFigures[stone.stoneid - 1].steps + diceNum - 40;
            if (fields.color === playerColor && fields.home === homePosition) {
              fields = { ...fields, x: playerColor };
              newArr[indexRow][indexFields] = { ...fields };
              canMove = true;
              return;
            }

          }
        })
      })

      if (canMove) {
        if (canMoveFromHome) {
          newArr[stone.row][stone.index].x = [...newArr[stone.row][stone.index].x.filter((item) => Number(item.stoneId) !== Number(stone.stoneid) && item.x !== stone.type)];
          updateFieldArray(newArr);
          if (diceNum !== 6) {
            players[players.length - 1] === playerColor ? nextPlayer = players[0] : nextPlayer = players[players.indexOf(playerColor) + 1];
            updatePlayerColor(nextPlayer);
            updateDiceUrl("");
          }
          return;
        }
        newArr[stone.row][stone.index] = { ...newArr[stone.row][stone.index], x: "" };
        updateFieldArray(newArr);
        if (diceNum !== 6) {
          players[players.length - 1] === playerColor ? nextPlayer = players[0] : nextPlayer = players[players.indexOf(playerColor) + 1];
          updatePlayerColor(nextPlayer);
          updateDiceUrl("");
        }
        return canMove = false;
      }
    }
  }

  const kickPlayerAtHome = (kickedPlayers, player) => {
    for (let i = 0; i < kickedPlayers.x.length; i++) {
      let playerFigures = [...playerStones[kickedPlayers.x[i].x].stones];
      newArr.map((row, indexRow) => {
        row.map((fields, indexFields) => {
          if (fields[kickedPlayers.x[i].x] === "start" && Number(fields.stoneId) === Number(kickedPlayers.x[i].stoneId)) {
            fields = { ...fields, x: kickedPlayers.x[i].x };
            newArr[indexRow][indexFields] = { ...fields };
            playerFigures[kickedPlayers.x[i].stoneId - 1].steps = 0;
          }
        })
      })
    }
    return true;
  }

  const kickPlayerWalking = (kickedPlayer, player) => {
    let playerFigures = [...playerStones[kickedPlayer.x].stones]
    newArr.map((row, indexRow) => {
      row.map((fields, indexFields) => {
        if (fields[kickedPlayer.x] === "start" && Number(fields.stoneId) === Number(kickedPlayer.stoneId)) {
          fields = { ...fields, x: kickedPlayer.x };
          newArr[indexRow][indexFields] = { ...fields };
          playerFigures[kickedPlayer.stoneId - 1].steps = 0;
        }
        if (fields.p === kickedPlayer.p) {
          fields = { ...fields, x: player.type };
          newArr[indexRow][indexFields] = { ...fields };
        }
      })
    })
    return true;
  }

  return (
    <div className="playingfield">
      {
        fieldArr.map((row, rowIndex) => {
          return row.map((field, index) => {
            return (
              <>
                <Field
                  key={index}
                  id={index}
                  row={rowIndex}
                  color={field.color ? field.color : field.x}
                  field={field}
                  onClick={field.x ? handleClick : ""}
                />
              </>
            )
          })
        })
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  updateFieldArray: (field) => dispatch(setFieldArray(field)),
  updatePlayerColor: (color) => dispatch(setPlayerColor(color)),
  updateDiceUrl: (newDiceUrl) => dispatch(setDiceUrl(newDiceUrl))

})

const mapStateToProps = createStructuredSelector({
  fieldArr: selectFieldArray,
  playerColor: selectPlayerColor,
  playerStones: selectPlayerStones,
  diceNum: selectPlayerDiceNumber
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayingField);