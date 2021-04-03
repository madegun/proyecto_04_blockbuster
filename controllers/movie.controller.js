import movie from '../models/movie.model.js';
import array2D from '../utils/array2D.js';

// This controller groups all methods related with movies.
export const movieController = {
    // List all movies in db
    listMovies: async (req, res) => {

        const resultsMovies = await movie.find();
        res.json(resultsMovies);
    },

    findMovieById: async (req, res) => {

        const queryId = req.params.id;
        const result = await movie.findById(queryId);
        res.json(result);
    },

    // This method more than one search terms in the url.
    findMovieByTitle: async (req, res) => {

        // search for each term.
        const searchTerms = req.params.title.split(" ");
        const matches = [];

        // Eventually, matches array will be 2D array
        for (const term of searchTerms) {
            const match = await movie.find({ title: { $regex: term, $options: "$i" } });

            matches.push(match);
        }

        const filteredMovies = array2D(matches);

        res.json(filteredMovies);
    },

    // This method more than one search terms in the url.
    findByCast: async (req, res) => {

        const searchTerms = req.params.cast.split(" ");
        const matches = [];

        // Eventually, matches array will be 2D array
        for (const term of searchTerms) {
            const match = await movie.find({ cast: { $regex: term, $options: "$i" } });

            matches.push(match);
        }

        const filteredMovies = array2D(matches);

        res.json(filteredMovies);
    },

    // This method more than one search terms in the url.
    findByGenre: async (req, res) => {
        const searchTerms = req.params.genre.split(" ");
        const matches = [];

        // Eventually, matches array will be 2D array
        for (const term of searchTerms) {
            const match = await movie.find({ genre: { $regex: term, $options: "$i" } });
            // const match = await movie.findOne({ genre: { $regex: term, $options: "$i" } }).lean();

            matches.push(match);
        }

        const filteredMovies = array2D(matches);

        res.json(filteredMovies);
    }
}