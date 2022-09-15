const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

beforeAll(async () => {
    await User.deleteMany({});
    const user = {
        username: 'user2',
        email: 'tests@email.com',
        password: 'test',
        confirmPassword: 'test'
    };

    await api.post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/);
});

describe('user profile', () => {
    test('can change username if not take', async () => {
        const user = {
            username: 'user3'
        };

        const updatedUser = await api.put('/api/users/user2')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    })
});

afterAll(() => mongoose.connection.close());
