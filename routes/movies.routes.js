import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';

const movieRoutes = Router();

movieRoutes.get("/", movieController.listMovies);
movieRoutes.get("/id/:id", movieController.findMovieById);
movieRoutes.get("/title/:title", movieController.findMovieByTitle);
movieRoutes.get("/cast/:cast", movieController.findByCast);
movieRoutes.get("/genre/:genre", movieController.findByGenre);

export default movieRoutes;