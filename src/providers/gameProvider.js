/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { GameService } from '../services/GameService'
import { IndexDBService } from '../services/IndexDBService'
import { ERROR_RESET_TIME } from '../constants/gameDetails'
import { delay } from '../utils/jsUtils'

const gameService = new GameService(new IndexDBService())
const { defaultPositions, defaultDBStatusState } = gameService.getDefaultGameState()

export const GameContext = React.createContext()

// TODO: HANDLE ERRORS AND RECORD STATS

const GameContextProvider = ({ children }) => {
  // game state
  const [context, changeContext] = useState({ ...defaultPositions })
  const updateContext = updatedPart => changeContext({ ...context, ...updatedPart })
  // dbinteractionsState
  const [dbStatusState, changeDBStatusState] = useState({ ...defaultDBStatusState })
  const updateDBStatusState = updatedPart => changeDBStatusState({ ...dbStatusState, ...updatedPart })
  const restoreDBStatusStateToDefaultWithDelay = () =>
    delay(() => updateDBStatusState(defaultDBStatusState), ERROR_RESET_TIME)
  // mount
  useEffect(() => {
    const response = gameService.connectToStorage()
    if (response.error) {
      // if db connection error, no restore from error, no possibility to use db until reload page
      changeDBStatusState(dbStatusState => ({ ...dbStatusState, error: response.error }))
    } else {
      const { personalRecord } = gameService.loadGameFromDB()
      if (personalRecord) updateContext({ personalRecord })
    }
  }, [])

  // handlers
  const selectHorse = positionObj => updateContext({ ...gameService.selectHorse(positionObj, context.selectedHorse) })

  const moveSelectedHorse = newPositionObj =>
    updateContext({ ...gameService.moveSelectedHorse(newPositionObj, context) })

  const saveGame = async () => {
    const response = await gameService.saveGameToDB({ ...context })
    const { error } = response
    updateDBStatusState(error ? { error } : { success: true })
    restoreDBStatusStateToDefaultWithDelay()
  }

  const loadLastSavedGame = async () => {
    const gameState = await gameService.loadGameFromDB()
    if (gameState.error) {
      updateDBStatusState({ error: gameState.error })
      restoreDBStatusStateToDefaultWithDelay()
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
