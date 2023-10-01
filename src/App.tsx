import React, {useMemo, useState} from 'react'
import {TodosSwitcherMode} from './models/TodosSwitcherMode'
import {Todo} from './models/Todo'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'
import useLocalStorageData from './hooks/useLocalStorageData'
import useTodosState from './hooks/useTodosState'
import {LOCAL_STORAGE_KEY} from './config'
import styles from './App.module.css'

const App = () => {
  const {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    clearCompletedTodos
  } = useTodosState()
  useLocalStorageData(LOCAL_STORAGE_KEY, todos, setTodos)

  const [todosSwitcherMode, setTodosSwitcherMode] =
    useState<TodosSwitcherMode>(TodosSwitcherMode.All)

  const visibleTodos = useMemo<Todo[]>(() => {
    switch (todosSwitcherMode) {
    case TodosSwitcherMode.Active:
      return todos.filter(t => !t.isCompleted)
    case TodosSwitcherMode.Completed:
      return todos.filter(t => t.isCompleted)
    default:
      return todos
    }
  }, [todos, todosSwitcherMode])

  React.useEffect(() => {
    setTodosSwitcherMode(TodosSwitcherMode.All)
  }, [todos])

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <Header/>
        <AddTodo onSubmit={addTodo}/>
        <TodoList
          todos={visibleTodos}
          updateTodo={updateTodo}
        />
        <Footer
          todos={todos}
          todosSwitcherMode={todosSwitcherMode}
          setTodosSwitcherMode={setTodosSwitcherMode}
          clearCompletedTodos={clearCompletedTodos}
        />
      </div>
    </div>
  )
}

export default App