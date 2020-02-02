import React from "react";
import ChessHorse from "../icons/ChessHorse";

import "./styles.css";

const Game = ({ conditions, onChooseHorse, chosenHorsePosition }) => {
  const horseClickHandler = position => () => onChooseHorse(position);

  const constructClassName = (horseColor, horsePosition) => {
    let baseClassName = "cell_wrapper";
    if (horseColor) baseClassName += " cell_with_horse";
    if (horsePosition === chosenHorsePosition) baseClassName += " chosen_horse";
    return baseClassName;
  };

  return (
    <div className="game_wrapper">
      {conditions.map((horse, index) => (
        <div
          key={index}
          className={constructClassName(horse.color, horse.position)}
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

export default Game;
