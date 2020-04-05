import React from 'react';
import './App.css';

import Field from './components/field';

let fieldArr = [
  {
    player: "red",
    home: 4,
    fields: 14
  },
  {
    player: "blue",
    home: 4,
    fields: 14
  },
  {
    player: "yellow",
    home: 4,
    fields: 14
  },
  {
    player: "green",
    home: 4,
    fields: 14
  }
]
let positionX = 0;
let positionY = 0;
let hight = 56
let width = 56
let tempArr = []
let i = 0
let color;

function App() {
  return (
    <div className="App">
      <div className="playingfield">
        {fieldArr.map((item, index) => {
          switch (item.player) {
            case "red":
              tempArr = [];
              i = 0
              while (i < item.fields) {
                color = i === 0 || i > 9 ? item.player : "";
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
              tempArr = [];
              i = 0;

              while (i < item.fields) {
                color = i === 0 || i > 9 ? item.player : "";
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
              tempArr = [];
              i = 0;

              while (i < item.fields) {
                color = i === 0 || i > 9 ? item.player : "";
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
              tempArr = [];
              i = 0;

              while (i < item.fields) {
                color = i === 0 || i > 9 ? item.player : "";
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
          return (tempArr.map((item) => {
            return item;
          }))
        })}
      </div>
    </div>
  );
}

export default App;
