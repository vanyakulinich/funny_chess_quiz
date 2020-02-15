import { createGamePositions } from "../utils/gameUtils";

export const horses = {
  black: "b",
  white: "w",
  noHorse: "no"
};

const { black, white, noHorse } = horses;

export const START_GAME_POSITIONS = createGamePositions([
  { [white]: 3 },
  { [noHorse]: 6 },
  { [black]: 3 }
]);

export const WIN_GAME_POSITIONS = createGamePositions([
  { [black]: 3 },
  { [noHorse]: 6 },
  { [white]: 3 }
]);
