import express from 'express'

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
        "id": 5,
        "name": "suraj Poppendieck", 
        "number": "39-23-6423122"
      }
]

const getTotalPersons = () => {
    let total = 0
    persons.map(person => total += 1)
    return total
}

const getRequestTime = () => {
    const date = new Date().toString()
    return date
}

const app = express()

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phone book has info for ${getTotalPersons()} people <br /> ${getRequestTime()} </p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(p => p.id === id)

    person
    ? response.json(person)
    : (response.statusMessage = `Person with id ${id} not found`, response.status(400).end())
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is up and running at port ${PORT}`)
})

