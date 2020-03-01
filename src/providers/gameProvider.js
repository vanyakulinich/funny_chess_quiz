/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { GameService } from '../services/GameService'
import { IndexDBService } from '../services/IndexDBService'
import { DEFAULT_RESET_TIME, SUCCESS_MESSAGES } from '../constants/gameDetails'
import { delay } from '../utils/jsUtils'

const gameService = new GameService(new IndexDBService())
const { defaultPositions, defaultDBStatusState } = gameService.getDefaultGameState()

export const GameContext = React.createContext()

const GameContextProvider = ({ children }) => {
  // game state
  const [context, changeContext] = useState({ ...defaultPositions })
  const updateContext = updatedPart => changeContext({ ...context, ...updatedPart })
  // dbinteractionsState
  const [dbStatusState, changeDBStatusState] = useState({ ...defaultDBStatusState })
  const updateDBStatusState = async updatedPart => {
    changeDBStatusState({ ...dbStatusState, ...updatedPart })
    await delay(() => changeDBStatusState(defaultDBStatusState), DEFAULT_RESET_TIME)
  }

  // mount
  useLayoutEffect(() => {
    ;(async () => {
      const dbStoredGame = await gameService.connectToStorage()
      if (dbStoredGame.error) {
        await updateDBStatusState({
          error: dbStoredGame.error,
          message: dbStoredGame.message,
        })
      } else {
        const { personalRecord } = dbStoredGame
        if (personalRecord) updateContext({ personalRecord })
      }
    })()
  }, [])

  // handlers
  const selectHorse = positionObj => updateContext({ ...gameService.selectHorse(positionObj, context.selectedHorse) })

  const moveSelectedHorse = newPositionObj =>
    updateContext({ ...gameService.moveSelectedHorse(newPositionObj, context) })

  const saveGame = async () => {
    const response = await gameService.saveGameToDB({ ...context })
    const { error, success, message } = response
    await updateDBStatusState(error ? { error, message } : { success, message })
  }

  const loadLastSavedGame = async () => {
    const gameState = await gameService.loadGameFromDB()
    if (gameState.error) {
      await updateDBStatusState({ error: gameState.error, message: gameState.message })
    } else {
      updateContext({ ...gameState })
      await updateDBStatusState({ success: true, message: SUCCESS_MESSAGES.load })
    }
  }

  const restartGame = () => changeContext({ ...defaultPositions, personalRecord: context.personalRecord })

  const currentContext = {
    store: { ...context, dbStatusState },
    actions: { selectHorse, moveSelectedHorse, saveGame, restartGame, loadLastSavedGame },
  }

  // provider wrapper
  return <GameContext.Provider value={currentContext}>{children}</GameContext.Provider>
}

GameContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
}

export default GameContextProvider
