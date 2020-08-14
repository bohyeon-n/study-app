import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const MenuItemWrapper = styled.div`
  text-align: center;
  background: #ffffff;
  font-weight: 700;
  div {
    width: 100%;
  }
`

export const MenuItem: FunctionComponent = ({ children }) => {
  return <MenuItemWrapper>{children}</MenuItemWrapper>
}
