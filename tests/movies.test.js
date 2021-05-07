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