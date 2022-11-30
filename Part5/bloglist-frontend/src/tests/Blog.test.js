import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders title', () => {

  const blog = {
    title: 'My blog',
    author: 'suraj'
  }

  const { container } = render(<Blog blog={blog}/>)

  const element = container.querySelector('.blog')
  expect(element).toHaveTextContent('My blog')
  expect(element).toHaveTextContent('suraj')
  expect(element).not.toHaveValue(0)
  expect(element).not.toHaveTextContent('www.url.com')

})