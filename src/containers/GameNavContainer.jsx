import React from 'react'
import useGameStore from '../hooks/useGameStore'
import useGameActions from '../hooks/useGameActions'

import GameNavButtonsGroup from '../components/buttons/GameNavButtonsGroup'

const GameNavContainer = () => {
  const { restartGame, saveGame, loadLastSavedGame } = useGameActions()
  const { isWinner } = useGameStore()

  const buttonsMap = {
    restart: {
      text: 'restart game',
      handler: restartGame,
    },
    save: {
      text: 'save game',
      handler: saveGame,
    },
    load: {
      text: 'load last saved game',
      handler: loadLastSavedGame,
    },
  }

  const clickHandler = buttonText => () => {
    const button = Object.values(buttonsMap).find(el => el.text === buttonText)
    if (button) button.handler()
  }

  return (
    <GameNavButtonsGroup
      restartText={buttonsMap.restart.text}
      saveText={buttonsMap.save.text}
      loadLastGameText={buttonsMap.load.text}
      clickHandler={clickHandler}
      isWinner={isWinner}
    />
  )
}

export default GameNavContainer
