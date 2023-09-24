import React from 'react'
import {Button, Input, Space} from 'antd'
import useInput from '../../hooks/useInput'
import styles from './AddTodo.module.css'

interface AddTodoProps {
  onSubmit: (value: string) => void
}

const AddTodo = (props: AddTodoProps) => {
  const todo = useInput('')

  const submit = () => {
    todo.setValue('')
    props.onSubmit(todo.value)
  }

  return (
    <Space.Compact className={styles.container}>
      <Input
        value={todo.value}
        onChange={todo.onChange}
        placeholder='Add todo'
      />
      <Button
        type='primary'
        disabled={todo.value === ''}
        onClick={submit}
      >
        Submit
      </Button>
    </Space.Compact>
  )
}

export default AddTodo