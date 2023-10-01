import React from 'react'
import {render} from '@testing-library/react'
import Footer from './Footer'
import {Todo} from '../../models/Todo'
import {TodosSwitcherMode} from '../../models/TodosSwitcherMode'

const testTodos: Todo[] = [
  {
    id: '555',
    title: 'first todo',
    isCompleted: false,
  },
  {
    id: '666',
    title: 'second todo',
    isCompleted: true,
  }
]

const mockClearUpdatedTodos = jest.fn()
const mockSetTodosSwitcherMode = jest.fn()

describe('Footer Component', () => {
  test('renders footer correctly', () => {
    const {getByTestId} = render(
      <Footer
        todos={testTodos}
        clearCompletedTodos={mockClearUpdatedTodos}
        setTodosSwitcherMode={mockSetTodosSwitcherMode}
        todosSwitcherMode={TodosSwitcherMode.All}
      />
    )

    const counterBlock = getByTestId('counter-block')
    expect(counterBlock).toBeInTheDocument()

    const allButton = getByTestId('all-button')
    expect(allButton).toBeInTheDocument()

    const activeButton = getByTestId('active-button')
    expect(activeButton).toBeInTheDocument()

    const completedButton = getByTestId('completed-button')
    expect(completedButton).toBeInTheDocument()

    const clearCompletedButton = getByTestId('clear-completed-button')
    expect(clearCompletedButton).toBeInTheDocument()
  })
})