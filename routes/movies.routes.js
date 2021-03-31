import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';

const movieRoutes = Router();

movieRoutes.get("/", movieController.listMovies);
movieRoutes.get("/searchId/:id", movieController.findMovieById);
movieRoutes.get("/searchTitle/:title", movieController.findMovieByTitle);
movieRoutes.get("/searchCast/:cast", movieController.findByCast);

export default movieRoutes;