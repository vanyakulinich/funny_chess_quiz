import React from 'react'

import GameFieldContainer from './GameFieldContainer'
import GameNavContainer from './GameNavContainer'
import GameMovesInfoContainer from './GameMovesInfoContainer'

const GameContainer = () => {
  return (
    <>
      <GameMovesInfoContainer />
      <GameFieldContainer />
      <GameNavContainer />
    </>
  )
}

export default GameContainer
