import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';

const movieRoutes = Router();

movieRoutes.get("/", movieController.listMovies);
// movieRoutes.get("/search/id", movieController.findMovieById);
movieRoutes.get("/searchId", movieController.findMovieById);
movieRoutes.get("/searchTitle", movieController.findMovieByTitle);

export default movieRoutes;