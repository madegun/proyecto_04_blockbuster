import movie from '../models/movie.model.js';

export const movieController = {
    listMovies: async (req, res) => {
        const resultsMovies = await movie.find();

        res.json(resultsMovies);
    },

    findMovieById: async (req, res) => {

        // localhost:3000/movie/search?id=605b64c0f0f9462918e5195a
        // const query = req.params.id;
        const queryId = req.query.id;
        console.log(`endpoint /movie/search?id=${queryId}`);

        // res.send(queryId);
        const result = await movie.findById(query);
        res.json(result);
    },

    findMovieByTitle: async (req, res) => {

        const queryTitle = req.query.title;
        const result = await movie.find({ "title": queryTitle });

        res.json(result);
    }
}