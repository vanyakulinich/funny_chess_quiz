import React from 'react'
import styled from 'styled-components'
import useGameStore from '../hooks/useGameStore'

const MovesInfoWrapper = styled.div`
  position: relative;
`

const CongratsWrapper = styled.div`
  font-size: ${props => props.theme.font.size.s20};
  position: absolute;
  top: -28px;
  left: -9px;
  width: 340px;
`

const GameMovesInfoContainer = () => {
  const { movesCount, isWinner } = useGameStore()
  return (
    <MovesInfoWrapper>
      {isWinner && <CongratsWrapper>Congratulations! You completed the quiz!</CongratsWrapper>}
      <div>MOVES: {movesCount}</div>
    </MovesInfoWrapper>
  )
}

export default GameMovesInfoContainer
// TODO
/**
 * ADD MOVES COUNT HERE AND INFO ABOUT RECORDS OF USER
 */
