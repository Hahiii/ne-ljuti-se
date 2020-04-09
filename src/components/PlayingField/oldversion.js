import React, { useState } from 'react';

import Field from '../field';
import Players from '../player';

import './index.scss';

function PlayingField({ playerTurn, playerIs }) {
  let [play, setPlay] = useState("")

  let fieldArr = [
    {
      player: "red",
      home: 4,
      homeColor: "blue",
      fields: 14
    },
    {
      player: "blue",
      home: 4,
      homeColor: "yellow",
      fields: 14
    },
    {
      player: "yellow",
      home: 4,
      homeColor: "green",
      fields: 14
    },
    {
      player: "green",
      home: 4,
      homeColor: "red",
      fields: 14
    }
  ]
  let positionX = 0;
  let positionY = 0;
  let hight = 66
  let width = 66
  let tempArr = []
  let i = 0
  let color;

  return (
    <div className="playingfield">
      {fieldArr.map((player, index) => {
        switch (player.player) {
          case "red":
            tempArr = [
              <Players
                player={player.player}
                isActive={playerTurn}
                playingIs={playerIs}  
              />
            ];
            i = 0
            while (i < player.fields) {
              color = i === 0 || i > 9 ? player.player : "";
              if (i === 0) {
                positionY = 250
                positionX = 0
              }
              else if (i < 5) {
                positionY = positionY - hight;
                positionX = positionX + width;
              }
              else if (i < 9) {
                positionY = positionY - hight * 2;
              }
              else if (i === 9) {
                positionY = positionY - hight;
                positionX = positionX + width;
              }
              else if (i > 9) {
                color = player.homeColor;
              }

              tempArr.push(
                <Field
                  key={i}
                  positionX={positionX}
                  positionY={positionY}
                  sort={color ? color : "blank"} />
              )
              i++
            }

            break;
          case "blue":
            tempArr = [
              <Players
                player={player.player}
                isActive={playerTurn}
                playingIs={playerIs}
              />
            ];
            i = 0;

            while (i < player.fields) {
              color = i === 0 || i > 9 ? player.player : "";
              if (i === 0) {
                positionY = positionY - hight * 5;
                positionX = positionX + width;
              }
              else if (i > 4 && i < 9) {
                positionY = positionY - hight;
                positionX = positionX + width;
              }
              else if (i > 9) {
                positionY = positionY - hight;
                positionX = positionX - width;
                color = player.homeColor;
              }

              tempArr.push(
                <Field
                  key={i}
                  positionX={positionX}
                  positionY={positionY}
                  sort={color ? color : "blank"} />
              )
              i++
            }
            break;
          case "yellow":
            tempArr = [
              <Players
                player={player.player}
                isActive={playerTurn}
                playingIs={playerIs}
              />
            ];
            i = 0;

            while (i < player.fields) {
              color = i === 0 || i > 9 ? player.player : "";
              if (i === 0) {
                positionX = positionX + width * 4;
              }
              else if (i < 5) {
                positionY = positionY - hight;
                positionX = positionX - width;
              }
              else if (i === 9) {
                positionY = positionY - hight;
                positionX = positionX - width;
              }
              else if (i > 9) {
                positionY = positionY - hight * 2;
                color = player.homeColor;
              }

              tempArr.push(
                <Field
                  key={i}
                  positionX={positionX}
                  positionY={positionY}
                  sort={color ? color : "blank"} />
              )
              i++
            }

            break;
          case "green":
            tempArr = [
              <Players
                player={player.player}
                isActive={playerTurn}
                playingIs={playerIs}
              />
            ];
            i = 0;

            while (i < player.fields) {
              color = i === 0 || i > 9 ? player.player : "";
              if (i === 0) {
                positionY = positionY + hight * 3;
                positionX = positionX - width
              }
              else if (i < 5) {
                positionY = positionY - hight * 2;
              }
              else if (i >= 5 && i < 9) {
                positionY = positionY - hight;
                positionX = positionX - width;
              }
              else if (i === 9) {
                positionY = positionY - hight * 2;
              }
              else if (i > 9) {
                positionY = positionY - hight;
                positionX = positionX + width;
                color = player.homeColor;
              }

              tempArr.push(
                <Field
                  key={i}
                  positionX={positionX}
                  positionY={positionY}
                  sort={color ? color : "blank"} />
              )
              i++
            }
            break;

          default:
            break;
        }

        return (tempArr.map((player) => {
          return player;
        }))
      })}
    </div>
  )
}
export default PlayingField;