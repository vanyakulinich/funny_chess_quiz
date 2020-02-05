import React from "react";
import ChessHorse from "../icons/ChessHorse";

import "./styles.css";

const GameField = ({
  conditions,
  onChooseHorse,
  chosenHorsePosition,
  moveHorseToCell
}) => {
  const horseClickHandler = horse => () => onChooseHorse(horse);
  const avaliableCellClickHandler = index => () =>
    chosenHorsePosition.avaliableCellsIndexes.includes(index) &&
    moveHorseToCell(index);

  // TODO: refactor this later
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
          onClick={avaliableCellClickHandler(index)}
        >
          {horse.color && (
            <ChessHorse
              color={horse.color}
              onClick={horseClickHandler(horse)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GameField;
