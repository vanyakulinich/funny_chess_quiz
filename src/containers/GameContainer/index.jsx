import React, { useState } from "react";
import GameField from "../../components/gameField";

const horsesTypes = {
  black: "#000000",
  white: "#ffffff",
  noHorse: ""
};

const createStartPositions = () => {
  const { black, white, noHorse } = horsesTypes;
  const whiteHorsesPos = [0, 1, 2];
  const blackHorsesPos = [9, 10, 11];
  return new Array(12).fill(0).map((el, index) => {
    const horseObj = { position: index, color: noHorse };
    if (whiteHorsesPos.includes(index)) horseObj.color = white;
    if (blackHorsesPos.includes(index)) horseObj.color = black;
    return horseObj;
  });
};

const defaultChosenHorsePosition = {
  index: null,
  color: "",
  avaliableCellsIndexes: []
};

const GameContainer = () => {
  const [state, changeState] = useState({
    currentConditions: createStartPositions(),
    chosenHorsePosition: { ...defaultChosenHorsePosition }
  });

  const calcAvaliablePositions = horseIndex => {
    // needs fix
    const possibleMoves = [1, -1, 5, -5, 7, -7];
    const avaliablePositions = [];
    possibleMoves.forEach(move => {
      if (
        state.currentConditions[horseIndex + move] &&
        !state.currentConditions[horseIndex + move].color
      ) {
        avaliablePositions.push(horseIndex + move);
      }
    });
    return avaliablePositions;
  };

  const onChooseHorse = horse =>
    changeState({
      ...state,
      chosenHorsePosition: {
        avaliableCellsIndexes: calcAvaliablePositions(horse.position),
        index: horse.position,
        color: horse.color
      }
    });

  const moveHorseToCell = index => {
    let movingHorseColor = "";
    const newConditions = state.currentConditions.map(el => {
      if (el.position === index) el.color = state.chosenHorsePosition.color;
      console.log(el);
      if (el.position === state.chosenHorsePosition.index) {
        movingHorseColor = el.color;
        console.log({ movingHorseColor });
        el.color = horsesTypes.noHorse;
      }

      return el;
    });
    changeState({
      ...state,
      currentConditions: [...newConditions],
      chosenHorsePosition: { ...defaultChosenHorsePosition }
    });
  };

  const { currentConditions, chosenHorsePosition } = state;
  return (
    <GameField
      conditions={currentConditions}
      onChooseHorse={onChooseHorse}
      chosenHorsePosition={chosenHorsePosition}
      moveHorseToCell={moveHorseToCell}
    />
  );
};

export default GameContainer;
