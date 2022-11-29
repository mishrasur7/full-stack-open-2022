import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders title', () => {

  const blog = {
    title: 'My blog',
    author: 'suraj'
  }

  render(<Blog blog={blog}/>)

  const element = screen.findByText('My blog')
  expect(element).toBeDefined()
})