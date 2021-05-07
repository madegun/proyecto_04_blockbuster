import request from 'supertest';

import app from '../app.js';

// Testing get all movies endpoint
it('respond with json containing a list of all movies', done => {
    request(app)
        .get('/movies')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
})

// Testing get
describe('/GET /movies/id/:id', () => {
    it('respond with json containing a single movie', done => {
        request(app)
            .get('/movies/id/605b6485f0f9462918e51952')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('respond with json "Movie not found" when movie does not exists', done => {
        request(app)
            .get('/movies/id/605b6485f0f9462918e51955')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Movie not found"')
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done()
            })
    })
})

describe('POST /movies', () => {
    it('respond with 201', done => {

        const data = {
            title: "testing",
            year: 2021,
            available: true,
            cast: ["test1", "test2"],
            genre: ["genre1, genre2"]
        }

        request(app)
            .post('/movies')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(err => {
                if (err) return done(err);
                done();
            })
    })

    it('respond with 400 on bad request', done => {
        const data = {};
        request(app)
            .post('/movies')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('"Movie object has not the correct format"')
            .end(err => {
                if (err) return done(err);
                done();
            })
    })
})