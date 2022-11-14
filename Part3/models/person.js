import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.MONGODB_URL

console.log(`Connecting to ${url}`)

mongoose
    .connect(url)
    .then(() => {console.log('Connected to database')})
    .catch(err => console.log(`Error connecting to mongodb: ${err.message}`))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Person = mongoose.model('phoneBook', personSchema)

export default Person

