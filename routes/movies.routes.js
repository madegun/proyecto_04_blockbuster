import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkPassword from '../middlewares/checkPassword.js';
import checkUser from '../middlewares/checkUser.js';

import { getAllMoviesService, getMovieByIdService } from '../services/moviesServices.js';

const movieRoutes = Router();

movieRoutes.get("/", movieController.listMovies);


movieRoutes.get("/id/:id", movieController.findMovieById);
movieRoutes.get("/title/:title", movieController.findMovieByTitle);
movieRoutes.get("/cast/:cast", movieController.findByCast);
movieRoutes.get("/genre/:genre", movieController.findByGenre);
// movieRoutes.post("/", checkUser, checkPassword, checkAdmin, movieController.newMovie);
movieRoutes.post("/", movieController.newMovie);
movieRoutes.delete("/:id", movieController.deleteMovie);
movieRoutes.put("/:id", movieController.updateMovie);

// Implementación en 3 capas( Router => Service (Express) => Controller (Lógica))
movieRoutes.get("/service", getAllMoviesService);
movieRoutes.post("/service", getMovieByIdService);

export default movieRoutes;