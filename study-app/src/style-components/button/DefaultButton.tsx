import React from 'react'

import styled from 'styled-components'

import { ButtonProps } from './ButtonProps'
import { basicTheme } from '../../styles/basic-theme'

export const ButtonWrapper = styled.button<ButtonProps>`
  width: ${props => (props.width ? props.width : 100)}px;
  height: ${props => (props.height ? props.height : 30)}px;
  font-size: 13px;
  text-align: center;
  border: 1px solid ${basicTheme.borderColors.main};
  vertical-align: center;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 0.25em;
  margin: 0.6em;
  font-weight: ${props => (props.boldFont ? 900 : 400)};
  color: ${basicTheme.fontColors.main};
  a {
    color: ${basicTheme.fontColors.main};
    text-decoration: none;
  }
  &:hover {
    background: ${basicTheme.bgColors.hover};
    border-color: ${basicTheme.borderColors.dark};
  }
`

export const AlertButtonWrapper = styled(ButtonWrapper)`
  color: ${basicTheme.fontColors.alert};
  a {
    color: ${basicTheme.fontColors.alert};
  }
`

export const DefaultButton = ({
  width,
  height,
  children,
  boldFont,
  onClick
}: ButtonProps) => {
  return (
    <ButtonWrapper
      width={width}
      height={height}
      boldFont={boldFont}
      onClick={e => onClick && onClick()}
    >
      {children}
    </ButtonWrapper>
  )
}

export const AlertButton = ({
  width,
  height,
  children,
  boldFont,
  onClick
}: ButtonProps) => {
  return (
    <AlertButtonWrapper
      width={width}
      height={height}
      boldFont={boldFont}
      onClick={e => onClick && onClick()}
    >
      {children}
    </AlertButtonWrapper>
  )
}
