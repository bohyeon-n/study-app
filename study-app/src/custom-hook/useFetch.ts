import { useState, useEffect } from 'react'

export const useFetch = (
  callback: Function,
  url: string,
  describeObj?: any
) => {
  const [loading, setLoading] = useState(false)

  const fetchInitialData = async () => {
    setLoading(true)
    try {
      const response = await fetch(url, {
        credentials: 'include'
      })
      const initialData = await response.json()
      callback(initialData)
      setLoading(false)
    } catch (e) {
      //  catch error
    }
  }

  const describe = describeObj ? [...describeObj] : []

  useEffect(() => {
    fetchInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, describe)

  return loading
}
