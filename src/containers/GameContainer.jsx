import React from "react";
import useGameStore from "../hooks/useGameStore";

const GameContainer = () => {
  const ctx = useGameStore();
  console.log({ ctx });
  // TODO: add field and another markup
  return <div>GAME</div>;
};

export default GameContainer;
