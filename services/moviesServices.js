import { movieController } from "../controllers/movie.controller.js";

export const getAllMoviesService = async (req, res) => {
    console.log("In service ###########");

    const results = await movieController.getAllMovies();
    res.json(results);
}

export const getMovieByIdService = async (req, res) => {
    console.log("In service ###########");

    const results = await movieController.getMovieById(req.body.id);
    res.json(results);
}