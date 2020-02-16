import { compareMultiArraysOfStrings } from "../utils/jsUtils";
import {
  WIN_GAME_POSITIONS,
  AVALIABLE_MOVES_MAP
} from "../constants/gameDetails";

export class GameService {
  getAvaliavbleMovesPositions(currentHorsePositionObj) {
    const { row, cell } = currentHorsePositionObj;
    const movesMapKey = `${row}${cell}`;
    const avaliableMoves = AVALIABLE_MOVES_MAP[movesMapKey];
    //   TODO
    return avaliableMoves;
  }

  checkWinGame(positions) {
    return compareMultiArraysOfStrings(WIN_GAME_POSITIONS, positions);
  }

  //   TODO: add methods for interacting with indexDB
}
