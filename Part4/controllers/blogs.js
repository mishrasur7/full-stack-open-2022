/* eslint-disable no-undef */
import express from 'express'
import jwt from 'jsonwebtoken'

import Blog from '../models/blog.js'
import User from '../models/user.js'
import logger from '../utils/logger.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// const getToken = request => {
//   const authorization = request.get('authorization')
//   if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.post('/', async (request, response) => {
  if(request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end()
  }

  console.log('token passed into request from middleware: ', request.token)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  console.log('decoded token: ', decodedToken)
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: user._id
  })

  logger.info(blog)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {
    likes: request.body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

export default blogsRouter
