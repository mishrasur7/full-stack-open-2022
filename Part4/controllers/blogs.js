import express from 'express'

import Blog from '../models/blog.js'
import logger from '../utils/logger.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response, next) => {
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

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))

  }
})

export default blogsRouter
