import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import Note from './models/note.js'

dotenv.config()

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    },
    {
      id: 4,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send('Hello suraj')
})

app.get('/api/notes', (request,response) => {
    Note.find({}).then(notes => {
      return response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note
      .findById(request.params.id)
      .then(note => {
        note
        ? response.json(note)
        : response.status(404).end()
      })
      .catch(error => {
        next(error)
      })
  })

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  // notes = Note.filter(note => note.id !== id)
    Note
      .findByIdAndDelete(id)
      .then(response.status(204).end())
      .catch(error => next(error))
  })

  // const generateId = () => {
  //   const maxId = notes.length > 0
  //       ? Math.max(...notes.map(note => note.id))
  //       : 0
  //   return maxId + 1
  // }

app.post('/api/notes', (request, response) => {
  console.log(request.headers)
  const body = request.body

  if(!body.content){
      return response.status(400).json({error: "content missing"})
  }

  const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date()
  })

  note.save().then(savedNote => response.json(savedNote))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  
  const note = {
    content: body.content,
    important: body.important
  }

  Note
    .findByIdAndUpdate(request.params.id, note, {new: true})
    .then(updatedNote => {
      console.log(note)
      console.log(updatedNote)
      response.json(updatedNote)
    })
    .catch(error => next(error))
})




// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain' })
//     response.end('Hello World')
// })

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use('/tests', requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, response, request, next) => {
  console.log(error.name)
  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || "8080";

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})


