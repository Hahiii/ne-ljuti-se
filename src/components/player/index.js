import React, { useRef, useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setGameStart } from "../../redux/player/player.action";
import {
  selectGameStart,
  selectPlayersName,
} from "../../redux/player/player.selectors";

const Player = ({ updateGameStatus, playersNames, color, isGameActive }) => {
  let [playerCount, setPlayerCount] = useState(0);
  let playerRed = useRef();
  let playerYellow = useRef();
  let playerBlue = useRef();
  let playerGreen = useRef();

  const handleClick = () => {
    updateGameStatus(true);
  };

  const submitName = (target) => {
    switch (target.id) {
      case "r":
        if (playerRed.current.value.trim() !== "") {
          playersNames[target.id] = playerRed.current.value.trim();
          target.disabled = true;
          playerRed.current.disabled = true;
          setPlayerCount((playerCount += 1));
        }
        break;
      case "y":
        if (playerYellow.current.value.trim() !== "") {
          playersNames[target.id] = playerYellow.current.value.trim();
          target.disabled = true;
          playerYellow.current.disabled = true;
          setPlayerCount((playerCount += 1));
        }
        break;
      case "b":
        if (playerBlue.current.value.trim() !== "") {
          playersNames[target.id] = playerBlue.current.value.trim();
          target.disabled = true;
          playerBlue.current.disabled = true;
          setPlayerCount((playerCount += 1));
        }
        break;
      case "g":
        if (playerGreen.current.value.trim() !== "") {
          playersNames[target.id] = playerGreen.current.value.trim();
          target.disabled = true;
          playerGreen.current.disabled = true;
          setPlayerCount((playerCount += 1));
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isGameActive ? (
        <span className={`player ${color}`}>{playersNames[color]}</span>
      ) : (
        <div className="get-names-container">
          <label htmlFor="r" className="r">
            Red
            <input type="text" className="r" name="r" id="r" ref={playerRed} />
            <button
              className="btn"
              id="r"
              onClick={(event) => submitName(event.target)}
            >
              Submit Name
            </button>
          </label>
          <label htmlFor="y" className="y">
            Yellow
            <input
              type="text"
              className="y"
              name="y"
              id="y"
              ref={playerYellow}
            />
            <button
              className="btn"
              id="y"
              onClick={(event) => submitName(event.target)}
            >
              Submit Name
            </button>
          </label>
          <label htmlFor="b" className="b">
            Blue
            <input type="text" className="b" name="b" id="b" ref={playerBlue} />
            <button
              className="btn"
              id="b"
              onClick={(event) => submitName(event.target)}
            >
              Submit Name
            </button>
          </label>
          <label htmlFor="r" className="g">
            Green
            <input
              type="text"
              className="g"
              name="g"
              id="g"
              ref={playerGreen}
            />
            <button
              className="btn"
              id="g"
              onClick={(event) => submitName(event.target)}
            >
              Submit Name
            </button>
          </label>
          {playerCount === 4 && (
            <button className="start" onClick={() => handleClick()}>
              Start Game
            </button>
          )}
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateGameStatus: (status) => dispatch(setGameStart(status)),
});

const mapStateToProps = createStructuredSelector({
  isGameActive: selectGameStart,
  playersNames: selectPlayersName,
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
