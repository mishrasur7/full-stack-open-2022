import express from 'express'

import Blog from '../models/blog.js'
import logger from '../utils/logger.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  if(request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end()
  } else {
    const blog = request.body.likes === undefined
      ? new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: 0
      })
      : new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
      })

    logger.info(blog)

    try{
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    } catch(exception) {
      next(exception)
    }
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

export default blogsRouter
