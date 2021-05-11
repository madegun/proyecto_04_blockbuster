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
            res.status(400).json({ message: error.message });
        }
    },

    findMovieById: async (req, res) => {
        try {
            const queryId = req.params.id;
            const result = await movie.findById(queryId);
            if (!result) {
                res.status(404).json('Movie not found');
            }
            res.send(result);
            // res.json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
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
    },
    newMovie: async (req, res) => {

        try {

            const newMovie = {
                title: req.body.title,
                year: req.body.year,
                available: req.body.available,
                cast: req.body.cast,
                genre: req.body.genre
            }

            // Before add the document to mongodb, object fields are verified. Fields cannot be empty.
            // cast and genre field are never empty, so length will be checked.
            if (newMovie.title !== undefined
                && newMovie.year !== undefined
                && newMovie.available !== undefined
                && newMovie.cast.length !== 0
                && newMovie.genre.length !== 0) {

                const result = await movie.create(newMovie);
                res.status(201).json(result);

            } else {
                res.status(400).json("Movie object has not the correct format")
            }

        } catch (error) {
            res.status(400).json({ message: "Movie was not added" });
        }
    },
    deleteMovie: async (req, res) => {
        try {
            const movieId = req.params.id;

            const result = await movie.findById(movieId);
            if (!result) {
                res.status(404).json({ message: "Id doesn't exist" });
            } else {
                await movie.findByIdAndDelete(movieId);
                res.status(200).json({ message: "Movie was successfully removed" })
            }
        } catch (error) {
            res.status(404).json({ message: message.error });
        }
    },
    updateMovie: async (req, res) => {

        try {
            const movieId = req.params.id;
            const updates = req.body;

            // We check if body is empty. Object.entries return an array with fields. If length === 0, the object is empty, so we don't modify the document
            if (Object.entries(updates).length === 0) {
                res.status(400).json({ message: "Fields are empty" })
            } else {
                const object = await movie.findByIdAndUpdate(movieId, updates);

                if (object) {
                    // res.status(200).json({ message: "Movie was updated successfully" });
                    res.status(200).json({ message: "Movie was updated successfully" });
                } else {
                    res.status(400).json({ message: "Movie not found" });
                }
            }

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}