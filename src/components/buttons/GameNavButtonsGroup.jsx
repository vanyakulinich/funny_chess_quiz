import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GameNavButton from './GameNavButton';

const ButtonsGroupWrapper = styled.div`
  ${props => props.theme.flex.centerAll}
  justify-content: space-between;
  height: 50px;
  width: 100%;
`;

const GameNavButtonsGroup = ({ restartText, saveText, onRestartClick, onSaveClick }) => {
  return (
    <ButtonsGroupWrapper>
      {restartText && <GameNavButton text={restartText} onClick={onRestartClick} />}
      {saveText && <GameNavButton text={saveText} onClick={onSaveClick} />}
    </ButtonsGroupWrapper>
  );
};

GameNavButtonsGroup.propTypes = {
  restartText: PropTypes.string,
  saveText: PropTypes.string,
  onRestartClick: PropTypes.func,
  onSaveClick: PropTypes.func,
};

GameNavButtonsGroup.defaultProps = {
  restartText: '',
  saveText: '',
  onRestartClick: () => {},
  onSaveClick: () => {},
};

export default GameNavButtonsGroup;
