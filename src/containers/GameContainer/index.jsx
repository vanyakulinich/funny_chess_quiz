import React, { useState, useEffect } from "react";
import Game from "../../components/game";

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
    chosenHorsePosition: null
  });

  const onChooseHorse = chosenHorsePosition =>
    changeState({ ...state, chosenHorsePosition });

  const { currentConditions, chosenHorsePosition } = state;
  return (
    <Game
      conditions={currentConditions}
      onChooseHorse={onChooseHorse}
      chosenHorsePosition={chosenHorsePosition}
    />
  );
};

export default GameContainer;
