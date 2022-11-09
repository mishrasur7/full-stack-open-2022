import http, { request } from 'http'
import express from 'express'
import cors from 'cors'

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

app.get('/', (request, response) => {
    response.send('Hello suraj')
})

app.get('/api/notes', (request,response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => {
        console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
    })

    note
    ? response.json(note)
    : (response.statusMessage = `Note with given id ${id} not!`, response.status(404).end())
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()

  })

  const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => note.id))
        : 0
    return maxId + 1
  }

  app.post('/api/notes', (request, response) => {
    console.log(request.headers)
    const body = request.body

    if(!body.content){
        return response.status(400).json({error: "content missing"})
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    console.log(note)
    notes = notes.concat(note)
    response.json(note)
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

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})


