import React from 'react'
import styled from 'styled-components'

const TitleWrapper = styled.div`
  font-size: ${props => props.theme.font.size.s25};
  font-weight: ${props => props.theme.font.weight.w9};
`

const TitleDescription = () => {
  return (
    <TitleWrapper>
      Chess quiz with 6 horses. The task is to replace horses, using as less moves as possible, so that white horses are
      in the bottom row and the black ones - in the top row.
    </TitleWrapper>
  )
}

export default TitleDescription
