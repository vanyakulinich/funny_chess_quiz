import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GameNavButton from './GameNavButton'

const ButtonsGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 115px;
  width: 305px;
`
const FullWidthBtnWrapper = styled.div`
  width: 100%;
  & > button {
    width: 100%;
  }
`

const GameNavButtonsGroup = ({ restartText, saveText, loadLastGameText, clickHandler, isWinner }) => {
  const saveBtnHandler = () => !isWinner && clickHandler(saveText)()
  return (
    <ButtonsGroupWrapper>
      {restartText && <GameNavButton text={restartText} onClick={clickHandler(restartText)} />}
      {saveText && <GameNavButton text={saveText} onClick={saveBtnHandler} disabled={isWinner} />}
      <FullWidthBtnWrapper>
        {loadLastGameText && <GameNavButton text={loadLastGameText} onClick={clickHandler(loadLastGameText)} />}
      </FullWidthBtnWrapper>
    </ButtonsGroupWrapper>
  )
}

GameNavButtonsGroup.propTypes = {
  restartText: PropTypes.string,
  saveText: PropTypes.string,
  onRestartClick: PropTypes.func,
  isWinner: PropTypes.bool,
  loadLastGameText: PropTypes.string,
}

GameNavButtonsGroup.defaultProps = {
  restartText: '',
  saveText: '',
  clickHandler: () => {},
  isWinner: false,
  loadLastGameText: '',
}

export default GameNavButtonsGroup
