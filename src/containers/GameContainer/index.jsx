import React, { useState, useEffect } from "react";
import GameField from "../../components/gameField";

const horses = {
  black: "#000000",
  white: "#ffffff",
  noHorse: ""
};

const createStartConditions = () => {
  const { black, white, noHorse } = horses;
  const whiteHorsesPos = [0, 1, 2];
  const blackHorsesPos = [9, 10, 11];
  return new Array(12).fill(0).map((el, index) => {
    if (whiteHorsesPos.includes(index))
      return { color: white, position: index };
    if (blackHorsesPos.includes(index))
      return { color: black, position: index };
    return { color: noHorse };
  });
};

const GameContainer = () => {
  const [state, changeState] = useState({
    currentConditions: createStartConditions(),
    chosenHorsePosition: {
      index: null,
      avaliableCellsIndexes: []
    }
  });

  const calcAvaliablePositions = horseIndex => {
    const possibleMoves = [1, -1, 5, -5, 7, -7];
    const avaliablePositions = [];
    possibleMoves.forEach((move, idx) => {
      if (
        state.currentConditions[horseIndex + move] &&
        !state.currentConditions[horseIndex + move].color
      ) {
        avaliablePositions.push(horseIndex + move);
      }
    });
    return avaliablePositions;
  };

  const onChooseHorse = position =>
    changeState({
      ...state,
      chosenHorsePosition: {
        avaliableCellsIndexes: calcAvaliablePositions(position),
        index: position
      }
    });

  const { currentConditions, chosenHorsePosition } = state;
  return (
    <GameField
      conditions={currentConditions}
      onChooseHorse={onChooseHorse}
      chosenHorsePosition={chosenHorsePosition}
    />
  );
};

export default GameContainer;
