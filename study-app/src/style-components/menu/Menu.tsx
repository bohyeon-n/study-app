import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { basicTheme } from '../../styles/basic-theme'

const MenuWrapper = styled.div`
  width: 100%;
  border: 1px solid ${basicTheme.borderColors.dark};
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
`
export const Menu: FunctionComponent = ({ children }) => {
  return <MenuWrapper>{children}</MenuWrapper>
}
