import React from 'react'
import {render, screen} from '@testing-library/react'
import Header from './Header'

test('render header', () => {
  render(<Header/>)
  const header = screen.getByText(/todos/i)
  expect(header).toBeInTheDocument()
})