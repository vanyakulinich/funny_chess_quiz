import React, { useContext } from "react";
import PropTypes from "prop-types";
import { GameContext } from "../providers/gameProvider";

const GameContainer = () => {
  const ctx = useContext(GameContext);
  console.log({ ctx });
  return <div>GAME</div>;
};

GameContainer.propTypes = {};

GameContainer.defaultProps = {};

export default GameContainer;
