import {ChangeEvent, useState} from 'react'

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return {
    value,
    setValue,
    onChange: handleChange
  }
}

export default useInput