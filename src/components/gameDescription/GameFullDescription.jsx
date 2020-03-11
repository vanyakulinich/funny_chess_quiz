import React from 'react'
import styled from 'styled-components'
import FullScreenPopup from '../popups/FullScreenPopup'

import startQuiz from '../../images/startQuiz.png'
import winQuiz from '../../images/winQuiz.png'

const DescWrapper = styled.div`
  position: absolute;
  bottom: -25px;
  right: 0;
`
const ImgWrapper = styled.img`
  height: 330px;
  width: 260px;
  margin: 20px;
`

const DescContainerWrapper = styled.div`
  ${props => props.theme.flex.centerAll}
  flex-direction: column;
  justify-content: space-evenly;
  width: 80%;
  height: 80%;
  background: ${props => props.theme.color.grey};
  padding: 20px;
  border-radius: 10px;
`
const ArrowWrapper = styled.span`
  font-size: ${props => props.theme.font.size.s25};
  color: ${props => props.theme.color.green};
`

const DescTextWrapper = styled.h3`
  width: 85%;
  font-size: ${props => props.theme.font.size.s25};
`

const ImagesWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ExampleImgContainer = styled.div`
  position: relative;
  &::before {
    content: "${props => props.label}";
    position: absolute;
    top: -10px;
    left: 36%;
    font-size: ${props => props.theme.font.size.s25};
    color: ${props => props.theme.color.green};
  }
`

const GameFullDescription = () => {
  return (
    <DescWrapper>
      <FullScreenPopup openBtnText="Read quiz description">
        <DescContainerWrapper>
          <DescTextWrapper>
            The quiz is very simple. Your task is to replace the horses as it is shown below: the black ones should take
            places of white ones and vice versa. The horses can move only according to chess rules. The interesting
            thing is that you should try to do it, using as less moves as you can. Our best solution is 20 moves. Try
            better.
          </DescTextWrapper>

          <ImagesWrapper>
            <ExampleImgContainer label="Before">
              <ImgWrapper src={startQuiz} alt="" />
            </ExampleImgContainer>

            <ArrowWrapper>=></ArrowWrapper>

            <ExampleImgContainer label="After">
              <ImgWrapper src={winQuiz} alt="" />
            </ExampleImgContainer>
          </ImagesWrapper>
        </DescContainerWrapper>
      </FullScreenPopup>
    </DescWrapper>
  )
}

export default GameFullDescription
