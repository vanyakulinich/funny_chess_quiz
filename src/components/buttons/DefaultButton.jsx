import styled from 'styled-components'

export const DefaultButton = styled.button`
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
`
