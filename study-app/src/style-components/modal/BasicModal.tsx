import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { ModalProps } from './ModalProps'

const BasicModalWrapper = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 1;
  display: ${props => (props.isOpen ? 'flex' : 'none')};
`
const ContentWrapper = styled.div`
  max-width: 560px;
  width: 100%;
  background: #ffffff;
  position: relative;
  z-index: 2;
`

export const BasicModal: FunctionComponent<ModalProps> = ({
  children,
  isOpen,
  onClickDelete
}) => {
  return (
    <BasicModalWrapper
      isOpen={isOpen}
      onClick={e => onClickDelete && onClickDelete()}
    >
      <ContentWrapper onClick={e => e.stopPropagation()}>
        {children}
      </ContentWrapper>
    </BasicModalWrapper>
  )
}
