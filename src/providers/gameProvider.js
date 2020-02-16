import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GameService } from '../services/GameService';
import { START_GAME_POSITIONS, HORSES } from '../constants/gameDetails';
import { deepCopyArray } from '../utils/jsUtils';

// TODO: move this to game service
const defaultContext = {
  positions: START_GAME_POSITIONS,
  selectedHorse: {
    position: { row: undefined, cell: undefined },
    avaliableMoves: [],
  },
  isWinner: false,
  movesCount: 0,
  personalRecord: undefined,
};

const gameService = new GameService();

export const GameContext = React.createContext();

const GameContextProvider = ({ children }) => {
  const [context, changeContext] = useState({ ...defaultContext });
  const updateContext = updatedPart => changeContext({ ...context, ...updatedPart });

  const selectHorse = positionObj => {
    const { row, cell } = positionObj;
    const { position: selectedPos } = context.selectedHorse;
    // avoids useless selections for same cell
    if (row === selectedPos.row && cell === selectedPos.cell) return;

    const avaliableMoves = gameService.getAvaliavbleMovesPositions(positionObj);
    updateContext({ selectedHorse: { position: positionObj, avaliableMoves } });
  };

  const moveSelectedHorse = newPositionObj => {
    const { row: toRow, cell: toCell } = newPositionObj;
    const {
      position: { row: curRow, cell: curCell },
    } = context.selectedHorse;
    const horseColor = context.positions[curRow][curCell];
    const newPositions = deepCopyArray(context.positions);
    newPositions[curRow][curCell] = HORSES.noHorse;
    newPositions[toRow][toCell] = horseColor;
    const isWinner = gameService.checkWinGame(newPositions);
    const movesCount = context.movesCount + 1;
    updateContext({
      positions: [...newPositions],
      selectedHorse: { ...defaultContext.selectedHorse },
      isWinner,
      movesCount,
      ...(isWinner && {
        personalRecord:
          !context.personalRecord || movesCount < context.personalRecord ? movesCount : context.personalRecord,
      }),
    });
  };

  // TODO: saving current game in indexDB
  const saveGame = () => {};

  const restartGame = () => changeContext({ ...defaultContext });

  const currentContext = {
    store: { ...context },
    actions: { selectHorse, moveSelectedHorse, saveGame, restartGame },
  };

  // provider wrapper
  return <GameContext.Provider value={currentContext}>{children}</GameContext.Provider>;
};

GameContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

export default GameContextProvider;
