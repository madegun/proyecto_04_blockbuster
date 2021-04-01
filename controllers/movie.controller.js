import movie from '../models/movie.model.js';

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

    findMovieByTitle: async (req, res) => {

        // INTENTO DE DEVOLVER RESULTADOS SEGUN CADA TÉRMINO
        // const queriesArray = req.params.title.split(" ");
        // console.log(queriesArray);
        // let results = [];

        // queriesArray.forEach(async (word) => {
        //     let r = await movie.find({ title: { $regex: word, $options: "$i" } });
        //     results.push(r);
        //     console.log(results);
        // });
        // console.log("First result " + results);

        // ESTE CÓDIGO FUNCIONA
        const queryTitle = req.params.title;

        // regex to search based on title
        const results = await movie.find({ title: { $regex: queryTitle, $options: "$i" } })
        res.json(results);
    },

    findByCast: async (req, res) => {

        const query = req.params.cast;
        const results = await movie.find({ cast: { $regex: query, $options: "$i" } });
        res.send(results);
    }
}