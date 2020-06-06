import { createSelector } from "reselect";

const selectPlayer = (state) => state.player;

export const selectPlayerColor = createSelector(
  [selectPlayer],
  (player) => player.turnPlayer
);

export const selectPlayerStones = createSelector(
  [selectPlayer],
  (player) => player[player.turnPlayer]
);

export const selectPlayerDiceNumber = createSelector(
  [selectPlayer],
  (player) => player.diceNumber
);

export const selectFieldArray = createSelector(
  [selectPlayer],
  (player) => player.fieldArr
);

export const selectDiceUrl = createSelector(
  [selectPlayer],
  (player) => player.setDiceUrl
);

export const selectGameStart = createSelector(
  [selectPlayer],
  (player) => player.gameStart
);

export const selectPlayersName = createSelector(
  [selectPlayer],
  (player) => player.playersName
);
