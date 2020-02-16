import React from "react";
import styled from "styled-components";
import shortid from "shortid";

import useGameStore from "../hooks/useGameStore";
import useGameActions from "../hooks/useGameActions";
import GameFieldRow from "../components/gameField/GameFieldRow";
import GameFieldCell from "../components/gameField/GameFieldCell";
import { compareArraysOfStrings } from "../utils/jsUtils";

const MainWrapper = styled.div`
  border: 1px solid ${props => props.theme.color.steel};
`;

const GameFieldContainer = () => {
  const { positions, selectedHorse } = useGameStore();
  const { selectHorse: selectHorseAction } = useGameActions();
  console.log({ positions, selectedHorse });

  const _checkEqualPositions = cellPositionsArr => {
    const { avaliableMoves } = selectedHorse;
    if (!avaliableMoves.length) return false;
    return !!avaliableMoves.find(moveArr =>
      compareArraysOfStrings(moveArr, cellPositionsArr)
    );
  };

  const _checkSelectedCell = ({ rowIdx, cellIdx }) => {
    const { row, cell } = selectedHorse.position;
    return row === rowIdx && cell === cellIdx;
  };

  const onSelectCell = positionObj => () => {
    const { horseColor, ...positions } = positionObj;
    if (horseColor) selectHorseAction(positions);
  };

  return (
    <MainWrapper>
      {positions.map((row, rowIdx) => {
        return (
          <GameFieldRow key={shortid.generate(rowIdx)}>
            {row.map((horseColor, cellIdx) => {
              return (
                <GameFieldCell
                  key={shortid.generate(cellIdx)}
                  horseColor={horseColor}
                  onSelectCell={onSelectCell({
                    row: rowIdx,
                    cell: cellIdx,
                    horseColor
                  })}
                  isAvaliableForMove={_checkEqualPositions([rowIdx, cellIdx])}
                  isSelected={_checkSelectedCell({
                    rowIdx,
                    cellIdx
                  })}
                />
              );
            })}
          </GameFieldRow>
        );
      })}
    </MainWrapper>
  );
};

export default GameFieldContainer;
