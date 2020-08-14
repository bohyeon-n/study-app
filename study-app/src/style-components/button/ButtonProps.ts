import { ReactNode } from 'react'

export interface ButtonProps {
  width?: number
  height?: number
  children: ReactNode
  boldFont?: boolean
  onClick?: Function
}
