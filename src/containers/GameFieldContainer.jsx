import React from "react";
import useGameStore from "../hooks/useGameStore";

const GameFieldContainer = () => {
  const ctx = useGameStore();
  console.log({ ctx });
  // TODO: add rows and cols of chess field
  return <div>GAME FIELD</div>;
};

export default GameFieldContainer;
