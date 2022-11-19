import express from 'express'

import Note from '../models/note.js'

const notesRouter = express.Router()

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
  // Note.find({}).then(notes => {
  //   response.json(notes)
  // })
})

notesRouter.get('/:id', async (request, response) => {
  const noteToFind = await Note.findById(request.params.id)
    response.json(noteToFind)

  // try {
  //   const noteToFind = await Note.findById(request.params.id)
  //   response.json(noteToFind)
  // } catch(exception) {
  //   next(exception)
  // }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  const savedNote = await note.save()
    response.status(201).json(savedNote)

  // try {
  //   const savedNote = await note.save()
  //   response.status(201).json(savedNote)
  // } catch(exception) {
  //   next(exception)
  // }

})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  // try {
  //   await Note.findByIdAndRemove(request.params.id)
  //   response.status(204).end()
  // } catch(exception) {
  //   next(exception)
  // }
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

export default notesRouter