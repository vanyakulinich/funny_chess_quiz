import { useContext, useMemo } from 'react'
import { GameContext } from '../providers/gameProvider'

const useGameStore = () => {
  const {
    store: { movesCount, positions, selectedHorse, isWinner, personalRecord, dbStatusState },
  } = useContext(GameContext)

  return {
    movesCount: useMemo(() => movesCount, [movesCount]),
    positions: useMemo(() => positions, [positions]),
    selectedHorse: useMemo(() => selectedHorse, [selectedHorse]),
    isWinner: useMemo(() => isWinner, [isWinner]),
    personalRecord: useMemo(() => personalRecord, [personalRecord]),
    dbError: useMemo(() => dbStatusState.error, [dbStatusState.error]),
    dbOperationSuccess: useMemo(() => dbStatusState.success, [dbStatusState.success]),
  }
}

export default useGameStore
