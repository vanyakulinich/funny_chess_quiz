import { useContext, useMemo } from "react";
import { GameContext } from "../providers/gameProvider";

const useGameStore = () => {
  const {
    store: { movesCount, positions, selectedHorse }
  } = useContext(GameContext);

  return {
    movesCount: useMemo(() => movesCount, [movesCount]),
    positions: useMemo(() => positions, [positions]),
    selectedHorse: useMemo(() => selectedHorse, [selectedHorse])
  };
};

export default useGameStore;
