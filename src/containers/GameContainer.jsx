import React from 'react'
import styled from 'styled-components'

import GameFieldContainer from './GameFieldContainer'
import GameNavContainer from './GameNavContainer'
import GameMovesInfoContainer from './GameMovesInfoContainer'
import GameMessagesContainer from './GameMessagesContainer'
import GameDescriptionContainer from './GameDescriptionContainer'

const GameWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const GameContainer = () => {
  return (
    <GameWrapper>
      <GameDescriptionContainer />
      <GameMovesInfoContainer />
      <GameFieldContainer />
      <GameNavContainer />
      <GameMessagesContainer />
    </GameWrapper>
  )
}

export default GameContainer
