import { PlayerActionTypes } from "./player.types";

const INITIAL_STATE = {
  r: {
    stones: [
      { steps: 0, stoneId: 1 },
      { steps: 0, stoneId: 2 },
      { steps: 0, stoneId: 3 },
      { steps: 0, stoneId: 4 },
    ],
    atHome: 0,
  },
  b: {
    stones: [
      { steps: 0, stoneId: 1 },
      { steps: 0, stoneId: 2 },
      { steps: 0, stoneId: 3 },
      { steps: 0, stoneId: 4 },
    ],
    atHome: 0,
  },
  y: {
    stones: [
      { steps: 0, stoneId: 1 },
      { steps: 0, stoneId: 2 },
      { steps: 0, stoneId: 3 },
      { steps: 0, stoneId: 4 },
    ],
    atHome: 0,
  },
  g: {
    stones: [
      { steps: 0, stoneId: 1 },
      { steps: 0, stoneId: 2 },
      { steps: 0, stoneId: 3 },
      { steps: 0, stoneId: 4 },
    ],
    atHome: 0,
  },
  turnPlayer: "r",
  setDiceUrl: "",
  gameStart: true,
  playersName: {},
  fieldArr: [
    [
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { color: "w", x: [], p: 9 },
      { color: "w", x: [], p: 10 },
      { color: "b", x: [], p: 11, start: "b" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
    ],
    [
      { "": "", "": "", "": "" },
      { x: "y", stoneId: 1, location: "start" },
      { x: "y", stoneId: 3, location: "start" },
      { "": "", "": "", "": "" },
      { color: "w", x: [], p: 8 },
      { color: "b", x: [], home: 1 },
      { color: "w", x: [], p: 12 },
      { "": "", "": "", "": "" },
      { x: "b", stoneId: 1, location: "start" },
      { x: "b", stoneId: 3, location: "start" },
      { "": "", "": "", "": "" },
    ],
    [
      { "": "", "": "", "": "" },
      { x: "y", stoneId: 2, location: "start" },
      { x: "y", stoneId: 4, location: "start" },
      { "": "", "": "", "": "" },
      { color: "w", x: [], p: 7 },
      { color: "b", x: [], home: 2 },
      { color: "w", x: [], p: 13 },
      { "": "", "": "", "": "" },
      { x: "b", stoneId: 2, location: "start" },
      { x: "b", stoneId: 4, location: "start" },
      { "": "", "": "", "": "" },
    ],
    [
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { color: "w", x: [], p: 6 },
      { color: "b", x: [], home: 3 },
      { color: "w", x: [], p: 14 },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
    ],
    [
      { color: "y", x: [], p: 1, start: "y" },
      { color: "w", x: [], p: 2 },
      { color: "w", x: [], p: 3 },
      { color: "w", x: [], p: 4 },
      { color: "w", x: [], p: 5 },
      { color: "b", x: [], home: 4 },
      { color: "w", x: [], p: 15 },
      { color: "w", x: [], p: 16 },
      { color: "w", x: [], p: 17 },
      { color: "w", x: [], p: 18 },
      { color: "w", x: [], p: 19 },
    ],
    [
      { color: "w", x: [], p: 40 },
      { color: "y", x: [], home: 1 },
      { color: "y", x: [], home: 2 },
      { color: "y", x: [], home: 3 },
      { color: "y", x: [], home: 4 },
      "",
      { color: "g", x: [], home: 4 },
      { color: "g", x: [], home: 3 },
      { color: "g", x: [], home: 2 },
      { color: "g", x: [], home: 1 },
      { color: "w", x: [], p: 20 },
    ],
    [
      { color: "w", x: [], p: 39 },
      { color: "w", x: [], p: 38 },
      { color: "w", x: [], p: 37 },
      { color: "w", x: [], p: 36 },
      { color: "w", x: [], p: 35 },
      { color: "r", x: [], home: 4 },
      { color: "w", x: [], p: 25 },
      { color: "w", x: [], p: 24 },
      { color: "w", x: [], p: 23 },
      { color: "w", x: [], p: 22 },
      { color: "g", x: [], p: 21, start: "g" },
    ],
    [
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { color: "w", x: [], p: 34 },
      { color: "r", x: [], home: 3 },
      { color: "w", x: [], p: 26 },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
    ],
    [
      { "": "", "": "", "": "" },
      { x: "r", stoneId: 1, location: "start" },
      { x: "r", stoneId: 3, location: "start" },
      { "": "", "": "", "": "" },
      { color: "w", x: [], p: 33 },
      { color: "r", x: [], home: 2 },
      { color: "w", x: [], p: 27 },
      { "": "", "": "", "": "" },
      { x: "g", stoneId: 1, location: "start" },
      { x: "g", stoneId: 3, location: "start" },
      { "": "", "": "", "": "" },
    ],
    [
      { "": "", "": "", "": "" },
      { x: "r", stoneId: 2, location: "start" },
      { x: "r", stoneId: 4, location: "start" },
      { "": "", "": "", "": "" },
      { color: "w", x: [], p: 32 },
      { color: "r", x: [], home: 1 },
      { color: "w", x: [], p: 28 },
      { "": "", "": "", "": "" },
      { x: "g", stoneId: 2, location: "start" },
      { x: "g", stoneId: 4, location: "start" },
      { "": "", "": "", "": "" },
    ],
    [
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { color: "r", x: [], p: 31, start: "r" },
      { color: "w", x: [], p: 30 },
      { color: "w", x: [], p: 29 },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
      { "": "", "": "", "": "" },
    ],
  ],
};

export const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.SET_PLAYER_COLOR:
      return {
        ...state,
        turnPlayer: action.payload,
        diceNumber: "",
      };
    case PlayerActionTypes.SET_THROWN_NUMBER:
      return {
        ...state,
        diceNumber: action.payload,
      };
    case PlayerActionTypes.SET_STONES:
      return {
        ...state,
      };
    case PlayerActionTypes.SET_FIELD_ARRAY:
      return {
        ...state,
        fieldArr: action.payload,
        diceNumber: "",
      };
    case PlayerActionTypes.SET_DICE_URL:
      return {
        ...state,
        setDiceUrl: action.payload,
      };
    case PlayerActionTypes.SET_GAME_START:
      return {
        ...state,
        gameStart: action.payload,
      };
    case PlayerActionTypes.SET_PLAYERS_NAME:
      return {
        ...state,
        playersName: { ...action.payload },
      };
    default:
      return state;
  }
};
