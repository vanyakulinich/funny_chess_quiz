import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PopupWrapper = styled.div`
  height: fit-content;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 85px 48px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 30%;
  left: 0%;
  border-radius: 5px;
  min-width: 200px;
  min-height: 140px;
  padding: 20px;
  box-sizing: border-box;
`

const DefaultPopup = ({ text }) => <PopupWrapper>{text}</PopupWrapper>

DefaultPopup.propTypes = {
  text: PropTypes.string,
}

DefaultPopup.defaultProps = {
  text: '',
}

export default DefaultPopup
