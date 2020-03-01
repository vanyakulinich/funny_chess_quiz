import React from 'react'

import GameFieldContainer from './GameFieldContainer'
import GameNavContainer from './GameNavContainer'
import GameMovesInfoContainer from './GameMovesInfoContainer'
import GameMessagesContainer from './GameMessagesContainer'

const GameContainer = () => {
  return (
    <>
      <GameMovesInfoContainer />
      <GameFieldContainer />
      <GameNavContainer />
      <GameMessagesContainer />
    </>
  )
}

export default GameContainer
