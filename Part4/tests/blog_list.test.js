/* eslint-disable no-undef */
import supertest from 'supertest'
import mongoose from 'mongoose'

import app from '../app'
import blogs from '../utils/data'
import Blog from '../models/blog'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  let blog = new Blog(blogs[0])
  await blog.save()
  blog = new Blog(blogs[1])
  await blog.save()
})

describe('blog api testing', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })

  test('all blogs are returned', async() => {
    const response = await Blog.find({})
    expect(response).toHaveLength(2)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
