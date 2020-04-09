import React, { useState } from 'react';

import Field from '../field';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFieldArray, selectPlayerDiceNumber, selectPlayerStones, selectPlayerColor } from '../../redux/player/player.selectors';
import { setFieldArray, setStones, setPlayerColor } from '../../redux/player/player.action';

import './index.scss';

function PlayingField({ updateFieldArray, updateStones, updatePlayerColor, fieldArr, diceNum, playerColor, playerStones }) {
  let players = ["y", "b", "g", "r"];
  const handleClick = (stone) => {
    let newIndex = 0;
    let numberThrown = diceNum;
    let newRow = 0;
    let canMove = false;
    let color = "";
    let stoneSteps = 0
    const newArr = [...fieldArr];
    let playerStone = [...playerStones[playerColor].stones];

    if (stone.type === playerColor) {
      playerStone.map((item) => {
        if (item.stoneId === Number(stone.stoneid)) {
          stoneSteps = item.steps;
        }
      })
      newArr.map((row, rowIndex) => {
        return row.map((field, index) => { 
          if (stoneSteps + diceNum >= 40) {
            let newPosition = stoneSteps + diceNum - 40;
            if (field.home == newPosition) {
              if (field.x == "") {
                newRow = rowIndex;
                newIndex = index;
                canMove = true
                return;
              }
            }
            return;
          }
          if (field.start === stone.type && diceNum === 6 && stoneSteps === 0) {
            if (field.x === "" || field.x !== stone.type) {
              newRow = rowIndex;
              newIndex = index;
              diceNum = 1;
              canMove = true
              return;
            }
          } else if (field.p === newArr[stone.row][stone.index].p + diceNum) {
            if (field.x == "" || field.x !== stone.type) {
              newRow = rowIndex;
              newIndex = index;
              canMove = true
              return;
            }
          } else if (newArr[stone.row][stone.index].p + diceNum > 40 && stoneSteps < 40) {
            let newPosition = newArr[stone.row][stone.index].p + diceNum - 40;
            if (field.p == newPosition) {
              console.log(field.p == newPosition);
              if (field.x == "" || field.x !== stone.type) {
                newRow = rowIndex;
                newIndex = index;
                canMove = true
                return;
              }
            }
          }
        })
      })
    }
    if (canMove) {
      playerStone.map((item) => {
        if (item.stoneId === Number(stone.stoneid)) {
          item.steps += diceNum;
          stoneSteps = item.steps;
        }
      })
      newArr[stone.row][stone.index] = { ...newArr[stone.row][stone.index], x: "", stoneId: "" };
      newArr[newRow][newIndex] = { ...newArr[newRow][newIndex], x: stone.type, stoneId: stone.stoneid };
      players[players.length - 1] === playerColor ? color = players[0] : color = players[players.indexOf(playerColor) + 1];

      if (numberThrown !== 6) {
        updatePlayerColor(color)
      }
      updateFieldArray(newArr);
      updateStones(playerStone);
      canMove = false;
    }
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
                {/* <Players
                key={index}
                color={field.x}
              /> */}
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
  updateStones: (payload) => dispatch(setStones(payload)),
  updatePlayerColor: (color) => dispatch(setPlayerColor(color)),
})

const mapStateToProps = createStructuredSelector({
  fieldArr: selectFieldArray,
  playerColor: selectPlayerColor,
  playerStones: selectPlayerStones,
  diceNum: selectPlayerDiceNumber
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayingField);