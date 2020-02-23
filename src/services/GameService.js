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
    this.dbService = dbService
  }

  getDefaultPositions() {
    return this.defaultPositions
  }

  connectToStorage() {
    const response = this.dbService.connect(this.dbStorageName)
    if (response.isError) return { error: 'connectFail' }
    this.dbService = response
    return {}
  }

  async saveGameToDB(gameState) {
    const response = await this.dbService.storeDataInDB(gameState)
    return response.isError ? { error: 'saveError' } : { success: response }
  }

  async loadGameFromDB() {
    const response = await this.dbService.getDataFromDB()
    return response.isError ? { error: 'loadFail' } : response
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
