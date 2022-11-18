import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app'
import Note from '../models/note'

const api = supertest(app)

const initialNotes = [
    {
      content: 'HTML is easy',
      date: new Date(),
      important: false,
    },
    {
      content: 'Browser can execute only Javascript',
      date: new Date(),
      important: true,
    },
  ]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

describe('api testing', () => {
    test('notes are returned as json', async () => {
        await api
          .get('/api/notes')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('all notes are returned', async () => {
        const response = await api.get('/api/notes')
      
        expect(response.body).toHaveLength(initialNotes.length)
      })
      
      test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(item => item.content)
      
        expect(contents).toContain('HTML is easy')
      })

      test('a valid note can be added', async () => {
        const newNote = {
          content: 'github is good for developers',
          important: true
        }

        await api
          .post('/api/notes')
          .send(newNote)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/notes')

        const contents = response.body.map(item => item.content)

        expect(contents).toHaveLength(initialNotes.length + 1)
        expect(contents).toContain('github is good for developers')
      })
})

afterAll(() => {
  mongoose.connection.close()
})
