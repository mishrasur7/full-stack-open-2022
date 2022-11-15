import express from 'express'

import notesRouter from './controllers/notes.js'

const app = express()

app.use('/api/notes', notesRouter)

export default app 