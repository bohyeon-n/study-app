import React from 'react'
import styled from 'styled-components'
import { defaultWidth, basicTheme } from '../../styles/basic-theme'

const FooterWrapper = styled.footer`
  max-width: ${defaultWidth.container}px;
  color: ${basicTheme.fontColors.sub};
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid ${basicTheme.borderColors.main};
  a {
    color: inherit;
    text-decoration: none;
  }
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <p>© 2020 koobohyeon</p>
      <a href="mailto: bohyoen.dev@gmail.com">bohyeon.dev@gmail.com</a>
    </FooterWrapper>
  )
}
