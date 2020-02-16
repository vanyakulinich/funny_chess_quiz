import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const GameFieldRowWrapper = styled.div`
  display: flex;
`;

const GameFieldRow = ({ children }) => (
  <GameFieldRowWrapper>{children}</GameFieldRowWrapper>
);

GameFieldRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default GameFieldRow;
