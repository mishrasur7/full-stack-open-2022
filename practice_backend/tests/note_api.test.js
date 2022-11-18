import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'

const api = supertest(app)
describe('api testing', () => {
    test('notes are returned as json', async () => {
        await api
          .get('/api/notes')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('there are no notes', async () => {
        const response = await api.get('/api/notes')
      
        expect(response.body).toHaveLength(11)
      })
      
      test('the first note is about HTTP methods', async () => {
        const response = await api.get('/api/notes')
      
        expect(response.body[0].content).toBe('HTML is very very very difficult')
      })
})

afterAll(() => {
  mongoose.connection.close()
})
