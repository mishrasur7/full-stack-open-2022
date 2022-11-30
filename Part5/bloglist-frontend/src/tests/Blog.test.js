import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders title and author but not likes and url', () => {

  const blog = {
    title: 'My blog',
    author: 'suraj',
    likes: 3,
    url: 'www.myblog.com'
  }

  const { container } = render(<Blog blog={blog}/>)

  const element = container.querySelector('.blog')
  expect(element).toHaveTextContent('My blog')
  expect(element).toHaveTextContent('suraj')
  expect(element).not.toHaveValue(3)
  expect(element).not.toHaveTextContent('www.myblog.com')

})