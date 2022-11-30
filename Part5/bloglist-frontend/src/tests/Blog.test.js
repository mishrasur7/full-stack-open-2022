import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

test('renders likes and url after button click', async () => {
  const blog = {
    title: 'My blog',
    author: 'suraj',
    likes: 3,
    url: 'www.myblog.com',
    user: '123'
  }

  const blogUser = {
    id: '123'
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} toggleDetail={mockHandler} user={blogUser}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = container.querySelector('.blogDetail')
  const like = screen.getByText('Likes 3', { exact: false })

  expect(element).toHaveTextContent('www.myblog.com')
  expect(like).toBeDefined()
})