import React from 'react'

import GameFieldContainer from './GameFieldContainer'
import GameNavContainer from './GameNavContainer'
import GameMovesInfoContainer from './GameMovesInfoContainer'
import GameMessagesContainer from './GameMessagesContainer'
import GameDescriptionContainer from './GameDescriptionContainer'

const GameContainer = () => {
  return (
    <>
      <GameDescriptionContainer />
      <GameMovesInfoContainer />
      <GameFieldContainer />
      <GameNavContainer />
      <GameMessagesContainer />
    </>
  )
}

export default GameContainer
