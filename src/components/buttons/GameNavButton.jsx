import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DefaultButton } from './DefaultButton'

const ButtonWrapper = styled(DefaultButton)`
  background-color: ${props => props.theme.color[props.disabled ? 'steel50' : 'steel']};
  color: ${props => props.theme.color[props.disabled ? 'black50' : 'black']};
`

const GameNavButton = ({ text, onClick, disabled }) => {
  return (
    <ButtonWrapper onClick={onClick} disabled={disabled}>
      {text}
    </ButtonWrapper>
  )
}

GameNavButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

GameNavButton.defaultProps = {
  text: '',
  onClick: () => {},
  disabled: false,
}

export default GameNavButton
