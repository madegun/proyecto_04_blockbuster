import Movie from '../models/movie.model.js';

import connectDatabase from '../config/connection_db.js';
import dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);

mongoose.connection.dropCollection('movies', (err, result) => {
    console.log("*** movies collection deleted ***");
})

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
    }),
    new Movie({
        title: "Matrix",
        year: 1998,
        available: true,
        cast: [
            "Keanue Reeves",
            "Carrie-Anne Moss",
            "Laurence Fishburne",
            "Hugo Weaving"
        ],
        genre: ["ciencia ficcion", "action"]
    }),
    new Movie({
        title: "Indiana Jones",
        year: 1989,
        available: true,
        cast: ["Harrison Ford", "Sean Connery"],
        genre: ["adventures", "action"]
    }),
    new Movie({
        title: "La gran apuesta",
        year: 2015,
        available: true,
        cast: ["Steve Carrell", "Ryan Gosling", "Christian Bale"],
        genre: ["drama", "commedy"]
    }),
    new Movie({
        title: "Tiempos modernos",
        year: 1936,
        available: true,
        cast: ["Charle Chaplin"],
        genre: ["commedy", "satire"]
    }),
    new Movie({
        title: "Matrix Reloaded",
        year: 2003,
        available: true,
        cast: [
            "Keanue Reeves",
            "Carrie-Anne Moss",
            "Laurence Fishburne",
            "Hugo Weaving"
        ],
        genre: ["ciencia ficcion", "action"]
    }),
    new Movie({
        title: "Matrix Revolutions",
        year: 2003,
        available: true,
        cast: [
            "Keanue Reeves",
            "Carrie-Anne Moss",
            "Laurence Fishburne",
            "Hugo Weaving"
        ],
        genre: ["ciencia ficcion", "action"]
    }),


];

let done = 0;
for (let i = 0; i < movies.length; i++) {
    movies[i].save((err, result) => {
        done++;
        if (done === movies.length) {
            console.log("Movies seed has been planted!");
            exit();
        }
    });
}

const exit = () => {
    mongoose.disconnect();
}

// To run the seed $ node movies.seeder.js