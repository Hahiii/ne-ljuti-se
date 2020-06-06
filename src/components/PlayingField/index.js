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
import { startRound } from "../../utils/index";

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
    if (
      stone.location === "start" &&
      stone.x === playerColor &&
      diceNum === 6
    ) {
      let location = startRound(stone, fieldArr);
      if (location.length) {
        const newArr = fieldArr.map((row, rowIndex) =>
          row.map((fields, fieldsIndex) => {
            if (
              rowIndex === Number(location[0]) &&
              fieldsIndex === Number(location[1])
            ) {
              return { ...fields, x: [playerColor] };
            }
            if (fields.stoneId === stone.stoneId && fields.x === stone.x) {
              return { ...fields, x: "" };
            }
            return { ...fields };
          })
        );
        let playerFigures = [
          ...playerStones.stones,
          playerStones.stones[Number(stone.stoneId - 1)].steps++,
        ];
        // updateStones(playerFigures);
        updateFieldArray(newArr);
      }
      // if (diceNum !== 6) {
      //   players[players.length - 1] === playerColor
      //     ? (nextPlayer = players[0])
      //     : (nextPlayer = players[players.indexOf(playerColor) + 1]);
      //   updatePlayerColor(nextPlayer);
      //   updateDiceUrl("");
      // }
    }
    // let playerFiguresAtHome = playerStones[stone.type].atHome;
    // if (stone.type === playerColor && diceNum) {
    //   let fieldClicked = newArr[stone.row][stone.index];

    //   newArr.map((row, indexRow) => {
    //     row.map((fields, indexFields) => {
    //       if (
    //         fields.start === stone.type &&
    //         playerFigures[stone.stoneid - 1].steps === 0 &&
    //         diceNum === 6
    //       ) {
    //         let xArr =
    //           fields.x !== ""
    //             ? fields.x.filter((item) => item.x === stone.type)
    //             : [];
    //         if (
    //           !xArr.length ||
    //           (fields.start === stone.type && fields.x === "")
    //         ) {
    //           if (fields.x.length) {
    //             if (kickPlayerAtHome(fields, fieldClicked)) {
    //               fields = {
    //                 ...fields,
    //                 x: [{ x: fieldClicked.x, stoneId: fieldClicked.stoneId }],
    //               };
    //               newArr[indexRow][indexFields] = { ...fields };
    //               playerFigures[stone.stoneid - 1].steps = 1;
    //               canMove = true;
    //               return true;
    //             }
    //           }
    //           fields.x.push({
    //             x: fieldClicked.x,
    //             stoneId: fieldClicked.stoneId,
    //           });
    //           fields = { ...fields, x: [...fields.x] };
    //           // fieldClicked = { ...fieldClicked, x: "" };
    //           newArr[indexRow][indexFields] = { ...fields };
    //           playerFigures[stone.stoneid - 1].steps = 1;
    //           canMove = true;
    //           return true;
    //         }
    //       }

    //       if (playerFigures[stone.stoneid - 1].steps + diceNum <= 40) {
    //         if (
    //           fields.p === fieldClicked.p + numberThrown ||
    //           (fields.p === fieldClicked.p + numberThrown - 40 &&
    //             fields.x !== stone.type)
    //         ) {
    //           if (fields.x === "" && !Array.isArray(fields.x)) {
    //             if (Array.isArray(fieldClicked.x)) {
    //               fields = {
    //                 ...fields,
    //                 x: stone.type,
    //                 stoneId: Number(stone.stoneid),
    //               };
    //               newArr[indexRow][indexFields] = { ...fields };
    //               canMove = true;
    //               canMoveFromHome = true;
    //               playerFigures[stone.stoneid - 1].steps += diceNum;
    //               return true;
    //             }

    //             fields = {
    //               ...fields,
    //               x: stone.type,
    //               stoneId: Number(stone.stoneid),
    //             };
    //             newArr[indexRow][indexFields] = { ...fields };
    //             canMove = true;
    //             playerFigures[stone.stoneid - 1].steps += diceNum;
    //             return true;
    //           }

    //           if (fields.x !== "" && !Array.isArray(fields.x)) {
    //             console.log(
    //               "i got here",
    //               fields.x,
    //               newArr[stone.row][stone.index]
    //             );
    //             if (kickPlayerWalking(fields, stone)) {
    //               canMove = true;
    //               return true;
    //             }
    //           }
    //           if (Array.isArray(fields.x)) {
    //             console.log("i should be here");

    //             fields.x.push({
    //               x: fieldClicked.x,
    //               stoneId: fieldClicked.stoneId,
    //             });
    //             fields = { ...fields, x: [...fields.x] };
    //             newArr[indexRow][indexFields] = { ...fields };
    //             playerFigures[stone.stoneid - 1].steps += diceNum;
    //             canMove = true;
    //             return true;
    //           }
    //         }
    //       } else {
    //         let homePosition =
    //           playerFigures[stone.stoneid - 1].steps + diceNum - 40;
    //         if (
    //           fields.color === playerColor &&
    //           fields.home === homePosition &&
    //           fields.x === ""
    //         ) {
    //           playerFiguresAtHome += 1;
    //           fields = {
    //             ...fields,
    //             x: playerColor,
    //             stoneId: Number(stone.stoneid),
    //           };
    //           newArr[indexRow][indexFields] = { ...fields };
    //           canMove = true;
    //           return true;
    //         }
    //       }
    //       return true;
    //     });
    //     return true;
    //   });

    //   if (canMove) {
    //     // if (Array.isArray(newArr[stone.row][stone.index].x)) {
    //     //   console.log("before", newArr[stone.row][stone.index].x);
    //     //   let tempArr = newArr[stone.row][stone.index].x.filter((item) => Number(item.stoneId) !== Number(stone.stoneid) && item.x !== stone.type);
    //     //   console.log("afetr", tempArr);
    //     // }
    //     Array.isArray(newArr[stone.row][stone.index].x)
    //       ? (newArr[stone.row][stone.index].x = [
    //           ...newArr[stone.row][stone.index].x.filter(
    //             (item) =>
    //               Number(item.stoneId) !== Number(stone.stoneid) &&
    //               item.x !== stone.type
    //           ),
    //         ])
    //       : (newArr[stone.row][stone.index] = {
    //           ...newArr[stone.row][stone.index],
    //           x: "",
    //         });
    //     updateFieldArray(newArr);
    //     if (diceNum !== 6) {
    //       players[players.length - 1] === playerColor
    //         ? (nextPlayer = players[0])
    //         : (nextPlayer = players[players.indexOf(playerColor) + 1]);
    //       updatePlayerColor(nextPlayer);
    //       updateDiceUrl("");
    //     }

    //     console.log(playerFigures[stone.stoneid - 1].steps);
    //     console.log(playerFiguresAtHome);

    //     return (canMove = false);
    //   }
    // }
  };

  // const kickPlayerAtHome = (kickedPlayers, player) => {
  //   for (let i = 0; i < kickedPlayers.x.length; i++) {
  //     let playerFigures = [...playerStones[kickedPlayers.x[i].x].stones];
  //     newArr.map((row, indexRow) => {
  //       row.map((fields, indexFields) => {
  //         if (
  //           fields[kickedPlayers.x[i].x] === "start" &&
  //           Number(fields.stoneId) === Number(kickedPlayers.x[i].stoneId)
  //         ) {
  //           fields = { ...fields, x: kickedPlayers.x[i].x };
  //           newArr[indexRow][indexFields] = { ...fields };
  //           playerFigures[kickedPlayers.x[i].stoneId - 1].steps = 0;
  //         }
  //         return true;
  //       });
  //       return true;
  //     });
  //   }
  //   return true;
  // };

  // const kickPlayerWalking = (kickedPlayer, player) => {
  //   let playerFigures = [...playerStones[kickedPlayer.x].stones];
  //   newArr.map((row, indexRow) => {
  //     row.map((fields, indexFields) => {
  //       if (
  //         fields[kickedPlayer.x] === "start" &&
  //         Number(fields.stoneId) === Number(kickedPlayer.stoneId)
  //       ) {
  //         fields = { ...fields, x: kickedPlayer.x };
  //         newArr[indexRow][indexFields] = { ...fields };
  //         playerFigures[kickedPlayer.stoneId - 1].steps = 0;
  //       }
  //       if (fields.p === kickedPlayer.p) {
  //         fields = { ...fields, x: player.type };
  //         newArr[indexRow][indexFields] = { ...fields };
  //       }
  //       return true;
  //     });
  //     return true;
  //   });
  //   return true;
  // };

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
