import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ChessHorse from "../icons/ChessHorse";

const GameFieldCellWrapper = styled.div`
  height: 100px;
  width: 100px;
  border: 1px solid ${props => props.theme.color.steel};
  ${props => props.withCursor && "cursor: pointer;"}

  ${props => props.theme.flex.centerAll}
  background: ${props => {
    if (props.isAvaliableForMove) return props.theme.color.blue;
    if (props.isSelected) return props.theme.color.green;
    return "transparent";
  }};

  & svg {
    height: 85%;
    width: 85%;
  }
`;

const GameFieldCell = ({
  horseColor,
  onSelectCell,
  isAvaliableForMove,
  isSelected
}) => {
  console.log({ isAvaliableForMove });
  return (
    <GameFieldCellWrapper
      onClick={onSelectCell}
      isAvaliableForMove={isAvaliableForMove && !horseColor}
      isSelected={isSelected}
      withCursor={!!horseColor || isAvaliableForMove}
    >
      {horseColor && <ChessHorse color={horseColor} />}
    </GameFieldCellWrapper>
  );
};

GameFieldCell.propTypes = {
  horseColor: PropTypes.string,
  onSelectCell: PropTypes.func,
  isAvaliableForMove: PropTypes.bool,
  isSelected: PropTypes.bool
};

GameFieldCell.defaultProps = {
  horseColor: "",
  onSelectCell: () => {},
  isAvaliableForMove: false,
  isSelected: false
};

export default GameFieldCell;
