import React from 'react';
// import useGameStore from '../hooks/useGameStore';
import useGameActions from '../hooks/useGameActions';

import GameNavButtonsGroup from '../components/buttons/GameNavButtonsGroup';

const GameNavContainer = () => {
  // const { movesCount, isWinner } = useGameStore();
  const { restartGame, saveGame } = useGameActions();

  //   TODO: add restart and save game buttons, moves count and components to style this stuff
  return (
    <>
      <GameNavButtonsGroup
        restartText="restart game"
        saveText="save game"
        onRestartClick={restartGame}
        onSaveClick={saveGame}
      />
      {/* TODO: remove it from here to GameMovesInfoContainer */}
      {/* <div>MOVES: {movesCount}</div>
      {isWinner && <div>You completed the quiz!</div>} */}
    </>
  );
};

export default GameNavContainer;
