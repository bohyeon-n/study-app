import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const ButtonStyle = styled.a`
  &:hover {
    opacity: 0.6;
    cursor: default;
  }
`
interface LinkButtonProps {
  children: ReactNode
  onClickHandler?: Function
}
export const LinkButton: FunctionComponent<LinkButtonProps> = ({
  children,
  onClickHandler
}) => {
  return (
    <ButtonStyle
      onClick={(e: React.MouseEvent<HTMLElement>) =>
        onClickHandler && onClickHandler()
      }
    >
      {children}
    </ButtonStyle>
  )
}
