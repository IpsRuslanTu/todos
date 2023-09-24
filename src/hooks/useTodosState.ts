import { useState } from 'react'
import {Todo} from '../models/Todo'
import {v4 as uuidv4} from 'uuid'

const useTodosState = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (newTodoTitle: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title: newTodoTitle,
      isCompleted: false
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (todoId: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId)
    setTodos(updatedTodos)
  }

  const updateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    )
    setTodos(updatedTodos)
  }

  const clearCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.isCompleted)
    setTodos(updatedTodos)
  }

  return {
    todos,
    setTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    clearCompletedTodos
  }
}

export default useTodosState