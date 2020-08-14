import React, { FunctionComponent, useState, ReactElement } from 'react'

import styled from 'styled-components'

const DropdownWrapper = styled.div``

const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
`

const OverlayWrapper = styled.div`
  position: absolute;
  width: 165px;
  top: 20px;
  right: 0;
  z-index: 1;
  &:after {
    border: 7px solid transparent;
    border-bottom-color: #fff;
    position: absolute;
    display: inline-block;
    content: '';
    top: -12px;
    right: 8px;
    left: auto;
  }

  &:before {
    top: -15px;
    right: 7px;
    left: auto;
    border: 8px solid transparent;
    border-bottom-color: rgba(27, 31, 35, 0.15);
    position: absolute;
    display: inline-block;
    content: '';
  }
`

export interface DropdownProps {
  overlay: ReactElement
  updateIndex: Function
  activeIndex: number
  index: number
}

export const Dropdown: FunctionComponent<DropdownProps> = ({
  children,
  overlay,
  updateIndex,
  activeIndex,
  index
}) => {
  const toggleIndex = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    updateIndex(index)
  }
  return (
    <DropdownWrapper>
      <IconWrapper className="icon" onClick={toggleIndex}>
        {children}
        {activeIndex === index && (
          <OverlayWrapper
            className="overlay"
            onClick={e => e.stopPropagation()}
          >
            {overlay}
          </OverlayWrapper>
        )}
      </IconWrapper>
    </DropdownWrapper>
  )
}
