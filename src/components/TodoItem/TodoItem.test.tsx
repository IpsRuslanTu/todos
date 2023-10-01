import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import {TodoItem} from './TodoItem'
import {Todo} from '../../models/Todo'

const mockUpdateTodo = jest.fn()

const sampleTodo: Todo = {
  id: '555',
  title: 'Sample Todo',
  isCompleted: false,
}

describe('TodoItem Component', () => {
  test('renders todo item correctly', () => {
    const { getByText, getByTestId } = render(
      <TodoItem todo={sampleTodo} updateTodo={mockUpdateTodo} />
    )

    const todoTitle = getByText('Sample Todo')
    expect(todoTitle).toBeInTheDocument()

    const completeButton = getByTestId('complete-button')
    expect(completeButton).toBeInTheDocument()
  })

  test('calls updateTodo on modal ok-button click when complete todo', async () => {
    const { getByTestId, getByRole } = render(
      <TodoItem todo={sampleTodo} updateTodo={mockUpdateTodo} />
    )

    const completeButton = getByTestId('complete-button')
    fireEvent.click(completeButton)

    await waitFor(() => {
      const modalOkButton = getByRole('button', {
        name: /ok/i
      })

      expect(modalOkButton).toBeInTheDocument()
      fireEvent.click(modalOkButton)
      expect(mockUpdateTodo).toHaveBeenCalledWith({ ...sampleTodo, isCompleted: true })
    })
  })

  test('renders a completed todo correctly', () => {
    const completedTodo = { ...sampleTodo, isCompleted: true }

    const { getByText, getByTestId } = render(
      <TodoItem todo={completedTodo} updateTodo={mockUpdateTodo} />
    )

    const todoTitle = getByText('Sample Todo')
    expect(todoTitle).toBeInTheDocument()

    const completedIcon = getByTestId('completed-icon')
    expect(completedIcon).toBeInTheDocument()
    expect(todoTitle).toHaveStyle('text-decoration: line-through')
  })
})