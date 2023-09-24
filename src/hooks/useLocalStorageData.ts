import {useEffect, useRef} from 'react'

const useLocalStorageData = <T>(key: string, state: T, setState?: (value: T) => void) => {
  const isFirstRenderRef = useRef<T | null>(null)

  useEffect(() => {
    if (!setState) {
      return
    }
    const storedData = localStorage.getItem(key)
    if (storedData) {
      const parsedData = JSON.parse(storedData) as T
      setState(parsedData)
      isFirstRenderRef.current = parsedData
    }
  }, [])

  useEffect(() => {
    if (isFirstRenderRef.current) {
      localStorage.setItem(key, JSON.stringify(isFirstRenderRef.current))
      isFirstRenderRef.current = null
    } else {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [key, state])
}

export default useLocalStorageData