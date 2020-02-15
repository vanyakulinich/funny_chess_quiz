import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GameService } from "../services/GameService";
import { START_GAME_POSITIONS } from "../constants/gameDetails";

const defaultContext = {
  positions: START_GAME_POSITIONS,
  selectedHorse: {
    position: undefined,
    avaliableMoves: []
  },
  movesCount: 0
};

const gameService = new GameService();

export const GameContext = React.createContext();

const GameContextProvider = ({ children }) => {
  const [context, changeContext] = useState(defaultContext);

  // TODO: actions
  const selectHorse = idx => {};

  const moveSelectedHorse = newIdx => {};

  const saveGame = () => {};

  const restartGame = () => changeContext(defaultContext);

  const currentContext = {
    ...context,
    actions: { selectHorse, moveSelectedHorse, saveGame, restartGame }
  };

  // provider wrapper
  return (
    <GameContext.Provider value={currentContext}>
      {children}
    </GameContext.Provider>
  );
};

GameContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default GameContextProvider;
