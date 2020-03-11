import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { DefaultButton } from '../buttons/DefaultButton'

const PopupWrapper = styled.div`
  height: fit-content;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 85px 48px rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
`

const OpenButton = styled(DefaultButton)`
  font-size: ${props => props.theme.font.size.s14};
  width: unset;
  padding: 0 10px;
  color: #ffffff80;
`

const CloseButton = styled(DefaultButton)`
  font-size: ${props => props.theme.font.size.s25};
  border-radius: 50%;
  height: 30px;
  width: 30px;
  padding: 0;
  padding-bottom: 2px;
  position: absolute;
  right: 50px;
  top: 50px;
  color: #ffffff80;
  ${props => props.theme.flex.centerAll}
`

const FullScreenPopup = ({ children, openBtnText }) => {
  const [isPopupOpen, togglePopupOpen] = useState(false)
  const clickHandler = () => togglePopupOpen(!isPopupOpen)

  return (
    <>
      <OpenButton onClick={clickHandler}>{openBtnText}</OpenButton>
      {isPopupOpen && (
        <PopupWrapper>
          {children}
          <CloseButton onClick={clickHandler}>&times;</CloseButton>
        </PopupWrapper>
      )}
    </>
  )
}

FullScreenPopup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  openBtnText: PropTypes.string.isRequired,
}

export default FullScreenPopup
