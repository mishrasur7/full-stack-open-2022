import express from 'express'
import bcrypt from 'bcrypt'

import User from '../models/user.js'

const userRouter = express.Router()

userRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await newUser.save()
        console.log('saved user:', savedUser)
        response.status(201).json(savedUser)
    } catch(exception) {
        next(exception)
    }
})

export default userRouter