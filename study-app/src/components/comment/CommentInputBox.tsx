import React, { FunctionComponent } from 'react'
import {
  NoBorderTextArea,
  TextArea
} from '../../style-components/textArea/TextArea'
import { DefaultButton } from '../../style-components/button/DefaultButton'
import styled from 'styled-components'
import { basicTheme } from '../../styles/basic-theme'

const CommentCreatorWrapper = styled.div`
  width: calc(100% - 2rem);
  border: 1px solid ${basicTheme.borderColors.main};
  border-top: 1.5rem solid ${basicTheme.bgColors.main};
  display: flex;
  padding: 1rem 1rem 0 1rem;
  flex-direction: column;
  max-height: 160px;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
  background: #ffffff;
  margin: auto;
`

export interface CommentInputBoxProps {
  disable: boolean
  handleChangeInput: Function
  defaultText: string
  handleClickRegister: Function
  autoFocus: boolean
}

export const CommentInputBox: FunctionComponent<CommentInputBoxProps> = ({
  disable,
  handleChangeInput,
  defaultText,
  handleClickRegister,
  autoFocus
}) => {
  return (
    <CommentCreatorWrapper>
      {disable ? (
        <>
          <NoBorderTextArea
            height={86}
            onChange={handleChangeInput}
            label={'comment'}
            fontSize={16}
            value={'로그인을 하셔야 댓글에 글을 쓸 수 있습니다.'}
            disable={true}
            autoFocus={false}
          />
          <DefaultButton
            height={34}
            onClick={(e: Event) =>
              alert('로그인을 하셔야 댓글에 글을 쓸 수 있습니다.')
            }
          >
            등록
          </DefaultButton>
        </>
      ) : (
        <>
          <TextArea
            height={86}
            onChange={handleChangeInput}
            label={'comment'}
            fontSize={16}
            value={defaultText}
            autoFocus={autoFocus}
          />
          <DefaultButton height={34} onClick={handleClickRegister}>
            등록
          </DefaultButton>
        </>
      )}
    </CommentCreatorWrapper>
  )
}
