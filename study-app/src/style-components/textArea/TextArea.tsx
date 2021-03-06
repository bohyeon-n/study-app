import React, { useRef } from 'react'
import styled from 'styled-components'
import { TextAreaProps } from './TextAreaProps'
import { InputLabel } from '../inputLabel/InputLabel'
import { basicTheme } from '../../styles/basic-theme'

interface TextAreaWrapper {
  width?: number
  height: number
  fontSize?: number
  disable?: boolean
}

const TextAreaWrapper = styled.textarea<TextAreaWrapper>`
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  height: ${props => props.height}px;
  font-size: ${props => props.fontSize}px;
  color: ${props =>
    props.disable ? basicTheme.fontColors.sub : basicTheme.fontColors.main};
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid ${basicTheme.borderColors.dark};
`

export const TextArea = ({
  width,
  height,
  onChange,
  label,
  fontSize,
  disable,
  autoFocus,
  value
}: TextAreaProps) => {
  const textAreaEl = useRef<HTMLTextAreaElement>(null)

  if (autoFocus) {
    textAreaEl.current && textAreaEl.current.focus()
  }

  return (
    <>
      <InputLabel label={label}>{label}: </InputLabel>
      <TextAreaWrapper
        disabled={disable ? true : false}
        disable={disable}
        fontSize={fontSize}
        id={label}
        onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => onChange(ev)}
        width={width}
        height={height}
        value={value ? value : ''}
        name={label}
        ref={textAreaEl}
      />
    </>
  )
}

const NoBorderTextAreaWrapper = styled(TextAreaWrapper)`
  border: none;
`

export const NoBorderTextArea = ({
  width,
  height,
  onChange,
  label,
  fontSize,
  disable,
  value
}: TextAreaProps) => {
  return (
    <>
      <InputLabel label={label}>{label}: </InputLabel>
      <NoBorderTextAreaWrapper
        disabled={disable ? true : false}
        fontSize={fontSize}
        id={label}
        onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>): void =>
          onChange(ev.target.value)
        }
        width={width}
        height={height}
        disable={disable}
        value={value ? value : ''}
      />
    </>
  )
}
