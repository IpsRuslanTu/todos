import React from 'react'
import {List} from 'antd'
import {Todo} from '../../models/Todo'
import {TodoItem} from '../TodoItem/TodoItem'
import styles from './TodoList.module.css'

interface TodoListProps {
  todos: Todo[]
  updateTodo: (todo: Todo) => void
}

const TodoList = (props: TodoListProps) => {
  return (
    <List
      className={styles.list}
      itemLayout='horizontal'
      dataSource={props.todos}
      renderItem={item => (
        <List.Item>
          <TodoItem todo={item} updateTodo={props.updateTodo}/>
        </List.Item>
      )}
    />
  )
}

export default TodoList