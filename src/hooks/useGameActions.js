import { useContext } from "react";
import { GameContext } from "../providers/gameProvider";

const useGameActions = () => {
  const { actions } = useContext(GameContext);

  return { ...actions };
};

export default useGameActions;
