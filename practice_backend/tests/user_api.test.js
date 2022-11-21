import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import supertest from 'supertest'

import app from "../app";
import User from "../models/user.js";
import test_helper from './test_helper'

const api = supertest(app)

describe('testing creation of user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({username: 'suraj', passwordHash})
        await user.save()
    })

    test('creation succeeds with a new user', async () => {
        const usersAtStart = await test_helper.usersInDb()

        console.log('users at start', usersAtStart)

        const newUser = {
            username: 'surajmishra',
            name: 'suraj mishra',
            password: 'strongpassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const userAtEnd = await test_helper.usersInDb()
        console.log('users at end', userAtEnd)
        const userNames = userAtEnd.map(user => user.username)

        expect(userAtEnd).toHaveLength(usersAtStart.length + 1)
        expect(userNames).toContain(newUser.username)
    })
})

afterAll(() => {
    mongoose.connection.close()
})