import { useState } from 'react'

export function useInputs(initialForm: any) {
  const [state, dispatch] = useState(initialForm)

  const onChange = (e: any) => {
    const { name, value } = e.target
    dispatch({ ...state, [name]: value })
  }

  const onchangeContent = (name: string, value: string) => {
    dispatch({ ...state, [name]: value })
  }

  const setAllValue = (data: any) => {
    dispatch(data)
  }

  return [state, onChange, onchangeContent, setAllValue]
}
