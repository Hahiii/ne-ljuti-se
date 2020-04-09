import { createSelector } from 'reselect';

const selectPlayer = state => state.player;

export const selectPlayerColor = createSelector(
  [selectPlayer],
  player => player.turnPlayer
);

export const selectPlayerStones = createSelector(
  [selectPlayer],
  player => player
);

export const selectPlayerDiceNumber = createSelector(
  [selectPlayer],
  player => player.diceNumber
);

export const selectFieldArray = createSelector(
  [selectPlayer],
  player => player.fieldArr
);
