import Movie from '../models/movie.model.js';
import connectDatabase from '../config/connection_db.js';
import dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);
// connectDatabase('localhost', 27017, 'blockbuster_seed');

const movies = [
    new Movie({
        title: "Interstellar",
        year: 2014,
        available: true,
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        genre: ["science fiction", "drama"]
    }),
    new Movie({
        title: "Blade Runner",
        year: 1982,
        available: true,
        cast: ["Harrison Ford", "Sean Young", "Daryl Hannah", "Rutger Hauer"],
        genre: ["science fiction", "drama"]
    })

];

let done = 0;
for (let i = 0; i < movies.length; i++) {
    movies[i].save((err, result) => {
        done++;
        if (done === movies.length) {
            exit();
        }
    });
}

const exit = () => {
    mongoose.disconnect();
}

// To run the seed $ node movies.seeder.js

