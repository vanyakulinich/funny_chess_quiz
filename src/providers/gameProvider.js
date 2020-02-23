import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { GameService } from '../services/GameService'
import { IndexDBService } from '../services/IndexDBService'
import { HORSES } from '../constants/gameDetails'
import { deepCopyArray } from '../utils/jsUtils'

const gameService = new GameService(new IndexDBService())
const defaultPositions = gameService.getDefaultPositions()

export const GameContext = React.createContext()

// TODO: HANDLE ERRORS AND RECORD STATS

const GameContextProvider = ({ children }) => {
  // game state
  const [context, changeContext] = useState({ ...defaultPositions })
  const updateContext = updatedPart => changeContext({ ...context, ...updatedPart })
  // dbinteractionsState
  const [dbStatusState, changeDBStatusState] = useState({
    error: '',
    success: false,
  })

  useEffect(() => {
    const response = gameService.connectToStorage()
    console.log({ response })
    if (response.error) {
      changeDBStatusState(dbStatusState => ({ ...dbStatusState, error: response.error }))
    }
  }, [])

  // TODO: move to service
  const selectHorse = positionObj => {
    const { row, cell } = positionObj
    const { position: selectedPos } = context.selectedHorse
    // avoids useless selections for same cell
    if (row === selectedPos.row && cell === selectedPos.cell) return

    const avaliableMoves = gameService.getAvaliavbleMovesPositions(positionObj)
    updateContext({ selectedHorse: { position: positionObj, avaliableMoves } })
  }
  // TODO: move to service
  const moveSelectedHorse = newPositionObj => {
    const { row: toRow, cell: toCell } = newPositionObj
    const {
      position: { row: curRow, cell: curCell },
    } = context.selectedHorse
    const horseColor = context.positions[curRow][curCell]
    const newPositions = deepCopyArray(context.positions)
    newPositions[curRow][curCell] = HORSES.noHorse
    newPositions[toRow][toCell] = horseColor
    const isWinner = gameService.checkWinGame(newPositions)
    const movesCount = context.movesCount + 1
    updateContext({
      positions: [...newPositions],
      selectedHorse: { ...defaultPositions.selectedHorse },
      isWinner,
      movesCount,
      ...(isWinner && {
        personalRecord:
          !context.personalRecord || movesCount < context.personalRecord ? movesCount : context.personalRecord,
      }),
    })
  }

  // TODO: saving current game in indexDB
  const saveGame = async () => {
    const response = await gameService.saveGameToDB({ ...context })
    console.log({ response })
    if (response.error) {
      // TODO: set user message to show error
    } else {
      // TODO set state flag to show user message
    }
  }

  const loadLastSavedGame = async () => {
    const gameState = await gameService.loadGameFromDB()
    console.log({ gameState })
    if (gameState.error) {
      // TODO
    } else {
      updateContext({ ...gameState })
    }
  }

  const restartGame = () => changeContext({ ...defaultPositions })

  const currentContext = {
    store: { ...context, dbStatusState },
    actions: { selectHorse, moveSelectedHorse, saveGame, restartGame, loadLastSavedGame },
  }
  console.log({ currentContext })
  // provider wrapper
  return <GameContext.Provider value={currentContext}>{children}</GameContext.Provider>
}

GameContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
}

export default GameContextProvider
