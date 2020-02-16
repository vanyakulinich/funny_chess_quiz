import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  outline: none;
  height: 35px;
  width: 135px;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  background-color: ${props => props.theme.color.steel};
  color: ${props => props.theme.color.black};
  font-size: ${props => props.theme.font.size.s16};
  &:focus,
  &:active {
    outline: none;
  }

  &:active {
    color: ${props => props.theme.color.black50};
    background-color: ${props => props.theme.color.steel50};
  }
`;

const GameNavButton = ({ text, onClick }) => {
  return <ButtonWrapper onClick={onClick}>{text}</ButtonWrapper>;
};

GameNavButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

GameNavButton.defaultProps = {
  text: "",
  onClick: () => {}
};

export default GameNavButton;
