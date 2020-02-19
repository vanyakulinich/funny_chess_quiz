import React from 'react'
import styled from 'styled-components'
import shortid from 'shortid'

import useGameStore from '../hooks/useGameStore'
import useGameActions from '../hooks/useGameActions'
import GameFieldRow from '../components/gameField/GameFieldRow'
import GameFieldCell from '../components/gameField/GameFieldCell'
import { compareArraysOfStrings } from '../utils/jsUtils'

const MainWrapper = styled.div`
  border: 1px solid ${props => props.theme.color.steel};
  ${props =>
    props.disabled &&
    `
    opacity: 0.5;
  `}
`

const GameFieldContainer = () => {
  const { positions, selectedHorse, isWinner } = useGameStore()
  const { selectHorse: selectHorseAction, moveSelectedHorse: moveSelectedHorseAction } = useGameActions()

  const _checkEqualPositions = cellPositionsArr => {
    const { avaliableMoves } = selectedHorse
    if (!avaliableMoves.length) return false
    return !!avaliableMoves.find(moveArr => compareArraysOfStrings(moveArr, cellPositionsArr))
  }

  const _checkSelectedCell = ([rowIdx, cellIdx]) => {
    const { row, cell } = selectedHorse.position
    return row === rowIdx && cell === cellIdx
  }

  const onSelectCell = positionArr => () => {
    if (isWinner) return
    const [row, cell, horseColor, isAvaliableForMove] = positionArr
    if (horseColor) selectHorseAction({ row, cell })
    if (!horseColor && isAvaliableForMove) {
      moveSelectedHorseAction({ row, cell })
    }
  }

  return (
    <MainWrapper disabled={isWinner}>
      {positions.map((row, rowIdx) => {
        return (
          <GameFieldRow key={shortid.generate(rowIdx)}>
            {row.map((horseColor, cellIdx) => {
              const cellPosArr = [rowIdx, cellIdx]
              const isAvaliableForMove = _checkEqualPositions(cellPosArr)
              return (
                <GameFieldCell
                  key={shortid.generate(cellIdx)}
                  horseColor={horseColor}
                  isAvaliableForMove={isAvaliableForMove}
                  isSelected={_checkSelectedCell(cellPosArr)}
                  onSelectCell={onSelectCell([...cellPosArr, horseColor, isAvaliableForMove])}
                />
              )
            })}
          </GameFieldRow>
        )
      })}
    </MainWrapper>
  )
}

export default GameFieldContainer
