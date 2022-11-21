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

describe('viewing blogs', () => {
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

  test('property id should be defined', async () => {
    const response = await Blog.find({})
    const firstBlog = response[0]
    console.log(firstBlog)
    expect(firstBlog.id).toBeDefined()
  })

  test('blog can be added', async () => {
    const newBlog = {
      title: 'a new blog',
      author: 'suraj mishra',
      url: 'www.surajmishra.com',
      likes: 500
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await Blog.find({})
    const titles = response.map(blog => blog.title)

    expect(response).toHaveLength(3)
    expect(titles).toContainEqual('a new blog')
  })

  test('blog without likes should return 0', async () => {
    const newBlog = {
      title: 'suraj blog',
      author: 'suraj mishra',
      url: 'fjkdasfhdsa'
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)

    const response = await Blog.find({})
    expect(response[2].likes).toBe(0)
  })

  test('should return status code 400 if title or url missing', async () => {
    const newBlog = {
      title: 'good title',
      author: 'mishra'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('testing with delete functionality', () => {
  test('should delete a blog with valid id and return status code 204', async () => {
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    const authors = blogsAtEnd.map(blog => blog.author)

    expect(blogsAtEnd).toHaveLength(1)
    expect(authors).not.toContainEqual('Michael Chan')
  })
})

describe('testing with updating blogs', () => {
  test('should update blog with valid id', async () => {
    const blogToUpdate = blogs[0]

    const blog = {
      likes: 200
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(blog)
      .expect(200)

    console.log(updatedBlog.body)
    expect(updatedBlog.body.likes).toBe(blog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})