import { compareMultiArraysOfStrings } from '../utils/jsUtils'
import { WIN_GAME_POSITIONS, START_GAME_POSITIONS, AVALIABLE_MOVES_MAP } from '../constants/gameDetails'

export class GameService {
  constructor(/*TODO: inject storageService */) {
    this.defaultPositions = {
      positions: START_GAME_POSITIONS,
      selectedHorse: {
        position: { row: undefined, cell: undefined },
        avaliableMoves: [],
      },
      isWinner: false,
      movesCount: 0,
      personalRecord: undefined,
    }
  }

  getDefaultPositions() {
    return this.defaultPositions
  }

  setStartPositionFromStorage() {
    // TODO
  }

  getAvaliavbleMovesPositions(currentHorsePositionObj) {
    const { row, cell } = currentHorsePositionObj
    const movesMapKey = `${row}${cell}`
    const avaliableMoves = AVALIABLE_MOVES_MAP[movesMapKey]
    return avaliableMoves
  }

  checkWinGame(positions) {
    return compareMultiArraysOfStrings(WIN_GAME_POSITIONS, positions)
  }
}
