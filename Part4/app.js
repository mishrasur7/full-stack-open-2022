import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cors from 'cors'

import config from './utils/config.js'
import middware from './utils/middleware.js'
import logger from './utils/logger.js'
import blogsRouter from './controllers/blogs.js'
import userRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'

const app = express()

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to database'))
  .catch((error) => logger.error('Error connecting to database', error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middware.unknownEndPoint)
app.use(middware.errorHandler)

export default app