import React from 'react'
import { InputProps } from './InputProps'
import styled from 'styled-components'
import { InputLabel } from '../inputLabel/InputLabel'

interface InputWrapper {
  width?: number
  height?: number
  fontSize?: number
}

const InputWrapper = styled.input<InputWrapper>`
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  height: ${props => (props.height ? props.height + 12 : 32)}px;
  font-size: ${props => (props.fontSize ? props.fontSize : 16)}px;
  padding: 6px 8px;
  box-sizing: border-box;
`

export const Input = ({
  width,
  height,
  onChange,
  label,
  fontSize,
  defaultContent
}: InputProps) => {
  return (
    <>
      <InputLabel label={label}>{label}: </InputLabel>
      <InputWrapper
        width={width}
        height={height}
        fontSize={fontSize}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          onChange(ev.target.value)
        }
        id={label}
        value={defaultContent}
      />
    </>
  )
}
