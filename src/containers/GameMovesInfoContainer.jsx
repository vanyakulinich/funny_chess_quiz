import React from 'react'
import styled from 'styled-components'
import useGameStore from '../hooks/useGameStore'
import { DEFAULT_WIN_RECORD } from '../constants/gameDetails'

const MovesInfoWrapper = styled.div`
  position: relative;
`

const CongratsWrapper = styled.div`
  font-size: ${props => props.theme.font.size.s20};
  position: absolute;
  top: 230px;
  left: 0;
  width: 340px;
`

const GameMovesInfoContainer = () => {
  const { movesCount, isWinner, personalRecord } = useGameStore()
  const winStr = 'Congrats! You completed the quiz!'
  const bestSolutionStr = `BEST SOLUTION: ${DEFAULT_WIN_RECORD} moves`
  const userBestSolutionStr = `YOUR BEST SOLUTION: ${personalRecord ? `${personalRecord} moves` : 'no solutions yet'}`
  const movesStr = `MOVES: ${movesCount}`

  return (
    <MovesInfoWrapper>
      {isWinner && <CongratsWrapper>{winStr}</CongratsWrapper>}
      <div>{bestSolutionStr}</div>
      <div>{userBestSolutionStr}</div>
      <div>{movesStr}</div>
    </MovesInfoWrapper>
  )
}

export default GameMovesInfoContainer
