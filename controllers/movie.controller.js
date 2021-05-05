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

        const searchTerms = req.params.title.split(" "), regex = searchTerms.join("|");

        // Where I found this solution: https://stackoverflow.com/questions/35321004/mongodb-query-in-with-regex-array-of-element/35321231
        const results = await movie.find({
            "title": {
                "$regex": regex,
                "$options": "i"
            }
        })

        // Eventually, matches array will be 2D array
        // search for each term.
        // const searchTerms = req.params.title.split(" ");
        // const matches = [];

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

        const searchTerms = req.params.cast.split(" "), regex = searchTerms.join("|");

        const results = await movie.find({
            "cast": {
                "$regex": regex,
                "$options": "i"
            }
        })

        res.json(results);
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