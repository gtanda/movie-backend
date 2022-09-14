const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('Movie retrieval ', () => {
    test('getting trending movies', async () => {
        await api.get('/api/tmdb?searchType=movie')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
});

afterAll(() => mongoose.connection.close());
