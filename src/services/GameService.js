import { compareArraysOfStrings } from "../utils/jsUtils";
import { WIN_GAME_POSITIONS } from "../constants/gameDetails";
export class GameService {
  calcAvaliavblePositions() {
    //   TODO
  }

  checkWinGame(positions) {
    return compareArraysOfStrings(WIN_GAME_POSITIONS, positions);
  }

  //   TODO: add methods for interacting with indexDB
}
