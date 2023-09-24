import React, {useMemo} from 'react'
import {Button, Modal} from 'antd'
import {TodosSwitcherMode} from '../../models/TodosSwitcherMode'
import {Todo} from '../../models/Todo'
import classNames from 'classnames'
import styles from './Footer.module.css'

interface FooterProps {
  todos: Todo[]
  todosSwitcherMode: TodosSwitcherMode
  setTodosSwitcherMode: (mode: TodosSwitcherMode) => void
  clearCompletedTodos: () => void
}

const Footer = (props: FooterProps) => {
  const counter = useMemo(() => {
    switch (props.todosSwitcherMode) {
    case TodosSwitcherMode.All:
      return props.todos.length
    case TodosSwitcherMode.Completed:
      return props.todos.filter(t => t.isCompleted).length
    case TodosSwitcherMode.Active:
      return props.todos.filter(t => !t.isCompleted).length
    }
  }, [props.todos, props.todosSwitcherMode])

  const clearCompletedTodos = () => {
    props.clearCompletedTodos()
    Modal.success({
      content: 'Completed todos have been cleared',
    })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.counter}>
        {counter === 0
          ? 'No todos'
          : `${counter} items`
        }
      </div>
      <div className={styles.switchers}>
        <Button
          type='default'
          className={classNames(
            {[styles.activeButton]: props.todosSwitcherMode === TodosSwitcherMode.All}
          )}
          size='small'
          onClick={() => props.setTodosSwitcherMode(TodosSwitcherMode.All)}
        >
            All
        </Button>
        <Button
          type='default'
          className={classNames(
            {[styles.activeButton]: props.todosSwitcherMode === TodosSwitcherMode.Active}
          )}
          size='small'
          onClick={() => props.setTodosSwitcherMode(TodosSwitcherMode.Active)}
        >
            Active
        </Button>
        <Button
          type='default'
          className={classNames(
            {[styles.activeButton]: props.todosSwitcherMode === TodosSwitcherMode.Completed}
          )}
          size='small'
          onClick={() => props.setTodosSwitcherMode(TodosSwitcherMode.Completed)}
        >
            Completed
        </Button>
      </div>
      <div>
        <Button
          type='default'
          size='small'
          disabled={props.todos.filter(t => t.isCompleted).length === 0}
          onClick={clearCompletedTodos}
        >
            Clear completed
        </Button>
      </div>
    </footer>
  )
}

export default Footer