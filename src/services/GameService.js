import { compareMultiArraysOfStrings } from '../utils/jsUtils'
import { WIN_GAME_POSITIONS, START_GAME_POSITIONS, AVALIABLE_MOVES_MAP } from '../constants/gameDetails'

export class GameService {
  constructor(dbService) {
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
    this.dbStorageName = 'quiz'
    this.dbService = dbService.connect(this.dbStorageName)
  }

  getDefaultPositions() {
    return this.defaultPositions
  }

  async saveGameToDB(gameState) {
    try {
      const response = await this.dbService.storeDataInDB(gameState)
      return { success: response }
    } catch (err) {
      return { error: 'scaveError' }
    }
  }

  async loadGameFromDB() {
    try {
      const data = await this.dbService.getDataFromDB()
      return !!data ? data : {}
    } catch (err) {
      return { error: 'loadError' }
    }
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
