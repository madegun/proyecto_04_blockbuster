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
describe('GET /movies/id/:id', () => {
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

// Testing POST
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

describe('DELETE /movies/:id', () => {
    // The problem is the id.
    // it('respond with 200 when movie is deleted', done => {
    //     request(app)
    //         .delete('/movies/609a42eca5f96d55aae4cefe')
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(err => {
    //             if (err) return done(err);
    //             done();
    //         })
    // })
    it('respond with 404 on bad request', done => {
        request(app)
            .delete('/movies/609a37012e0c2240a79833a8')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done()
            })
    })
})

describe('PUT /movies/:id', () => {
    it('respond with 200 when document is updated', done => {

        const data = { year: 2076 }

        request(app)
            .put('/movies/605b6485f0f9462918e51952')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err);
                done();
            })
    })

    it('respond with 400 when body doesnt contain data or movie doesnt exists', done => {
        const data = {}

        request(app)
            .put('/movies/605b6485f0f9462918e51952')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(err => {
                if (err) return done(err);
                done();
            })
    })
})