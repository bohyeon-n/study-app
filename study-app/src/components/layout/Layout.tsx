import React, { FunctionComponent } from 'react'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'
import styled from 'styled-components'
import { defaultWidth } from '../../styles/basic-theme'

const MainWrapper = styled.main`
  max-width: ${defaultWidth.container}px;
  margin-right: auto;
  margin-left: auto;
`
interface LayoutProps {
  handleSearch: Function
}

export const Layout: FunctionComponent<LayoutProps> = ({
  children,
  handleSearch
}) => {
  return (
    <>
      <Header handleSearch={handleSearch} />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </>
  )
}
