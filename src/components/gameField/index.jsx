import React from "react";
import ChessHorse from "../icons/ChessHorse";

import "./styles.css";

const GameField = ({ conditions, onChooseHorse, chosenHorsePosition }) => {
  const horseClickHandler = position => () => onChooseHorse(position);

  const constructClassName = (horseColor, horsePosition, index) => {
    let baseClassName = "cell_wrapper";
    if (horseColor) baseClassName += " cell_with_horse";
    if (horsePosition === chosenHorsePosition.index)
      baseClassName += " chosen_horse";
    if (
      !horseColor &&
      chosenHorsePosition.avaliableCellsIndexes.includes(index)
    )
      baseClassName += " avaliable_for_move";
    return baseClassName;
  };

  return (
    <div className="game_wrapper">
      {conditions.map((horse, index) => (
        <div
          key={index}
          className={constructClassName(horse.color, horse.position, index)}
        >
          {horse.color && (
            <ChessHorse
              color={horse.color}
              onClick={horseClickHandler(horse.position)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GameField;
