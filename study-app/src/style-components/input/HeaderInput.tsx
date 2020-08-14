import React from 'react'
import styled from 'styled-components'
import { basicTheme } from '../../styles/basic-theme'

const InputStyle = styled.input`
  width: 200px;
  height: 28px;
  border-bottom: 1px solid ${basicTheme.fontColors.white};
  border-top: none;
  border-right: none;
  border-left: none;
  font-weight: 600;
  font-size: 16px;
`

interface IProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  value: string

  onChange(value: string): void
}

export const Input: React.FunctionComponent<IProps> = ({
  children,
  onChange,
  ...shared
}) => {
  return <InputStyle onChange={e => onChange(e.target.value)} {...shared} />
}
