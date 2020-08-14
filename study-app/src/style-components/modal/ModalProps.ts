import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'

export interface ModalProps {
  children?: ReactNode
  isOpen: boolean
  onClickDelete?: Function
}
