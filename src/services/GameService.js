import { compareMultiArraysOfStrings, deepCopyArray } from '../utils/jsUtils'
import { WIN_GAME_POSITIONS, START_GAME_POSITIONS, AVALIABLE_MOVES_MAP, HORSES } from '../constants/gameDetails'
import { ERRORS_NAMES } from '../constants/gameErrors'

export class GameService {
  constructor(dbService) {
    this.dbStorageName = 'quiz'
    this.dbService = dbService

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
    this.defaultDBStatusState = {
      error: '',
      success: false,
    }
  }

  getDefaultGameState() {
    return { defaultPositions: this.defaultPositions, defaultDBStatusState: this.defaultDBStatusState }
  }

  async connectToStorage() {
    const response = await this.dbService.connect(this.dbStorageName)
    if (response.isError) return { error: ERRORS_NAMES.connect }
    this.dbService = response
    return await this.loadGameFromDB()
  }

  async saveGameToDB(gameState) {
    const response = await this.dbService.storeDataInDB(gameState)
    return response.isError ? { error: ERRORS_NAMES.save } : { success: response }
  }

  async loadGameFromDB() {
    const response = await this.dbService.getDataFromDB()
    if (!response) return {}
    return response.isError ? { error: ERRORS_NAMES.load } : response
  }

  async updatePersonalRecordInDB(newRecord) {
    const dbData = await this.loadGameFromDB()
    if (dbData.error || dbData.personalRecord <= newRecord) return
    await this.saveGameToDB({ ...dbData, personalRecord: newRecord })
  }

  selectHorse(positionObj, selectedHorse) {
    const { row, cell } = positionObj
    const { position: selectedPos } = selectedHorse
    // avoids useless selections for same cell
    if (row === selectedPos.row && cell === selectedPos.cell) return

    const avaliableMoves = this.getAvaliavbleMovesPositions(positionObj)
    return { selectedHorse: { position: positionObj, avaliableMoves } }
  }

  getAvaliavbleMovesPositions(currentHorsePositionObj) {
    const { row, cell } = currentHorsePositionObj
    const movesMapKey = `${row}${cell}`
    const avaliableMoves = AVALIABLE_MOVES_MAP[movesMapKey]
    return avaliableMoves
  }

  moveSelectedHorse(newPositionObj, context) {
    const { row: toRow, cell: toCell } = newPositionObj
    const {
      position: { row: curRow, cell: curCell },
    } = context.selectedHorse

    const horseColor = context.positions[curRow][curCell]
    const newPositions = deepCopyArray(context.positions)
    newPositions[curRow][curCell] = HORSES.noHorse
    newPositions[toRow][toCell] = horseColor
    const isWinner = this.checkWinGame(newPositions)
    const movesCount = context.movesCount + 1
    if (isWinner) this.updatePersonalRecordInDB(movesCount)
    return {
      positions: [...newPositions],
      selectedHorse: { ...this.defaultPositions.selectedHorse },
      isWinner,
      movesCount,
      ...(isWinner && {
        personalRecord:
          !context.personalRecord || movesCount < context.personalRecord ? movesCount : context.personalRecord,
      }),
    }
  }

  checkWinGame(positions) {
    return compareMultiArraysOfStrings(WIN_GAME_POSITIONS, positions)
  }
}
