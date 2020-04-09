import { PlayerActionTypes } from './player.types';


export const setPlayerColor = color => ({
  type: PlayerActionTypes.SET_PLAYER_COLOR,
  payload: color
});


export const setDiceNumber = diceNum => ({
  type: PlayerActionTypes.SET_THROWN_NUMBER,
  payload: diceNum
});

export const setStones = payload => ({
  type: PlayerActionTypes.SET_STONES,
  payload,
});

export const setFieldArray = payload => ({
  type: PlayerActionTypes.SET_FIELD_ARRAY,
  payload,
});

// export const setFieldArray = payload => ({
//   type: PlayerActionTypes.SET_STONES,
//   payload,
// });



