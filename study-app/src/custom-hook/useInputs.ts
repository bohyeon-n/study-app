import { useReducer } from 'react'

function reducer(state: any, action: any) {
  return {
    ...state,
    [action.name]: action.value
  }
}

export function useInputs(initialForm: any) {
  const [state, dispatch] = useReducer(reducer, initialForm)

  const onChange = (e: any) => {
    dispatch(e.target)
  }

  const onchangeContent = (name: string, value: string) => {
    dispatch({ name: name, value: value })
  }

  const reset = () => {
    dispatch(initialForm)
  }
  return [state, onChange, onchangeContent, reset]
}
