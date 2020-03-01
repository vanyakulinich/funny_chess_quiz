import React from 'react'
import useGameStore from '../hooks/useGameStore'

import DefaultPopup from '../components/popups/DefaultPopup'

const GameMessagesContainer = () => {
  const { dbError, dbOperationSuccess, dbMessage } = useGameStore()
  return dbError || dbOperationSuccess ? <DefaultPopup text={dbMessage} /> : null
}

export default GameMessagesContainer
