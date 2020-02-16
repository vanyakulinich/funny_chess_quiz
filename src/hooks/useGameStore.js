import { useContext, useMemo } from "react";
import { GameContext } from "../providers/gameProvider";

const useGameStore = () => {
  const {
    store: { movesCount, positions, selectedHorse, isWinner }
  } = useContext(GameContext);

  return {
    movesCount: useMemo(() => movesCount, [movesCount]),
    positions: useMemo(() => positions, [positions]),
    selectedHorse: useMemo(() => selectedHorse, [selectedHorse]),
    isWinner: useMemo(() => isWinner, [isWinner])
  };
};

export default useGameStore;
