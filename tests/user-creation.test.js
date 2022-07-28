const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeAll(async () => {
  await User.deleteMany({})
})

describe('user creation', () => {
  test('with a valid user info works', async () => {
    const user = {
      username: 'user2',
      email: 'tests@email.com',
      password: 'test',
      confirmPassword: 'test'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('with non-matching passwords fails', async () => {
    const user = {
      username: 'user',
      email: 'tests@email.com',
      password: 'test1',
      confirmPassword: 'test'
    }

    await api.post('/api/users')
      .send(user)
      .expect(403)
      .expect('Content-Type', /application\/json/)
  })
  test('with an already taken name fails', async () => {
    const user = {
      username: 'user2',
      email: 'tests@email.com',
      password: 'test',
      confirmPassword: 'test'
    }

    await api.post('/api/users')
      .send(user)
      .expect(400)
  })
})

afterAll(() => mongoose.connection.close())
