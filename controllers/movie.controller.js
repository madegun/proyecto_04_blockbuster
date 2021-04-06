import movie from '../models/movie.model.js';
import array2D from '../utils/array2D.js';

// This controller groups all methods related with movies.
export const movieController = {
    // List all movies in db
    listMovies: async (req, res) => {
        try {
            const resultsMovies = await movie.find();
            res.json(resultsMovies);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

    findMovieById: async (req, res) => {
        try {
            const queryId = req.params.id;
            const result = await movie.findById(queryId);
            res.json(result);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

    // This method more than one search terms in the url.
    findMovieByTitle: async (req, res) => {

        // search for each term.
        const searchTerms = req.params.title.split(" ");

        // Consulta que funciona en compass. Hay que hacerlo dinamico y con regex
        const results = await movie.find({ title: { $in: ["Matrix", "Blade Runner"] } });

        // const matches = [];

        // // Eventually, matches array will be 2D array
        // for (const term of searchTerms) {
        //     const match = await movie.find({ title: { $regex: term, $options: "$i" } });

        //     matches.push(match);
        // }

        // const filteredMovies = array2D(matches);

        // res.json(filteredMovies);
        res.json(results);
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