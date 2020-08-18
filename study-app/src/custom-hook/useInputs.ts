import { useState, useCallback } from 'react'

export const useInputs = (initialForm: any) => {
  const [form, setForm] = useState(initialForm)

  const onChange = useCallback(e => {
    const { name, value } = e.target
    setForm((form: any) => ({ ...form, [name]: value }))
  }, [])

  const reset = useCallback(() => setForm(initialForm), [initialForm])

  return [form, onChange, reset]
}