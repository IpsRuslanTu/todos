import React from 'react'
import {BorderOutlined, CheckCircleOutlined} from '@ant-design/icons'
import {Todo} from '../../models/Todo'
import {Modal, Typography} from 'antd'
import styles from './TodoItem.module.css'

interface TodoItemProps {
  todo: Todo
  updateTodo: (todo: Todo) => void
}

export const TodoItem = ({todo, updateTodo}: TodoItemProps) => {
  const complete = () => {
    Modal.confirm({
      title: 'Confirm task completion',
      onOk: () => {
        const updatedTodo = {...todo, isCompleted: true}
        updateTodo(updatedTodo)
      }
    })
  }

  return (
    <div className={styles.todo}>
      {todo.isCompleted
        ? <CheckCircleOutlined
          className={`${styles.icon} ${styles.completed}`}
        />
        : <BorderOutlined
          className={styles.icon}
          onClick={complete}
        />
      }
      <Typography.Text
        delete={todo.isCompleted}
        type={todo.isCompleted ? 'secondary' : undefined}
      >
        {todo.title}
      </Typography.Text>
    </div>
  )
}