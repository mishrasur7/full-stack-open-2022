import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

let persons = [
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
      }, 
      { 
        "id": 6,
        "name": "Shova Poppendieck", 
        "number": "39-23-6423122"
      },

]

//useful methods and variables
const getTotalPersons = () => {
    let total = 0
    persons.map(person => total += 1)
    return total
}

const getRequestTime = () => {
    const date = new Date().toString()
    return date
}


const generateRandomID = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const maxId = persons.length > 0
? Math.max(...persons.map(p => p.id))
: 1

//global middlewares
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// app.use(morgan('tiny'))

//use of custom token post-request
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-request'))

morgan.token('post-request', (req, res) => {
    return JSON.stringify(req.body)
})


//routes
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phone book has info for ${getTotalPersons()} people <br /> ${getRequestTime()} </p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    person
    ? response.json(person)
    : (response.statusMessage = `Person with id ${id} not found`, response.status(400).end())
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    
    !person
    ? (response.statusMessage = `Person not found with id ${id}`, response.status(404).end())
    : persons = persons.filter(person => person.id !== id) 
        response.status(202).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    console.log('person', person)

    if(!person.name) {
        return response.status(400).json({error: 'name is missing'})
    } else if(!person.number) {
        return response.status(400).json({error: 'number is missing'})
    } else {
        if(persons.find(p => p.name === person.name)) {
            return response.status(400).json({error: 'name must be unique'})
        } else {
            const newPerson = {
                name: person.name,
                number: person.number,
                id: generateRandomID(5000, maxId)
            }
            
            persons = persons.concat(newPerson)
            response.json(newPerson)
        }
    }
})

const PORT = process.env.PORT || "3001"
app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`)
})

