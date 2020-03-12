import React from 'react'
import styled from 'styled-components'
import TitleDescription from '../components/gameDescription/TitleDescription'
import GameFullDescription from '../components/gameDescription/GameFullDescription'

const ContainerWrapper = styled.div`
  position: absolute;
  top: 10px;
  width: 80vw;
  left: -30%;
  max-width: 600px;
  @media screen and (max-width: 550px) {
    position: absolute;
    left: -4px;
  }
`

const GameDescriptionContainer = () => {
  return (
    <ContainerWrapper>
      <TitleDescription />
      <GameFullDescription />
    </ContainerWrapper>
  )
}

export default GameDescriptionContainer
