import express from 'express'

import Blog from '../models/blog.js'
import User from '../models/user.js'
import logger from '../utils/logger.js'
import middleware from '../utils/middleware.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  if(request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end()
  }

  console.log('user: ', request.user)
  const user = await User.findById(request.user.id)

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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user
  console.log('user passed into request: ', user)

  const userId = user.id

  console.log('userid: ', userId)

  const blog = await Blog.findById(request.params.id)

  console.log('user id from blog: ', blog.user.toString())

  console.log(blog.user.toString() === userId.toString())

  if(blog.user.toString() !== userId.toString()) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

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
