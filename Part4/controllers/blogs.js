import express from 'express'

import Blog from '../models/blog.js'
import logger from '../utils/logger.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  logger.info(blog)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

export default blogsRouter
