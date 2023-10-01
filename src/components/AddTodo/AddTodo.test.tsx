import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import AddTodo from './AddTodo'

describe('AddTodo Component', () => {
  let onSubmitMock: jest.Mock<void, [string]>
  let input: HTMLInputElement
  let btn: HTMLButtonElement

  beforeEach(() => {
    onSubmitMock = jest.fn()
    render(<AddTodo onSubmit={onSubmitMock}/>)
    input = screen.getByPlaceholderText(/add todo/i)
    btn = screen.getByRole('button')
  })

  test('renders input and button', () => {
    expect(input).toBeInTheDocument()
    expect(btn).toBeInTheDocument()
    expect(btn).toBeDisabled()
  })

  test('updates input value on change', () => {
    fireEvent.change(input, {target: {value: 'Test todo'}})
    expect(input.value).toBe('Test todo')
  })

  test('enables button on input and submits', () => {
    fireEvent.change(input, {target: {value: 'Test todo'}})
    expect(btn).not.toBeDisabled()

    fireEvent.click(btn)
    expect(onSubmitMock).toHaveBeenCalledWith('Test todo')
  })
})