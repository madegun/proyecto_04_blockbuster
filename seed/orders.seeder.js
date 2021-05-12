import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';
import connectDatabase from '../config/connection_db.js';
import dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);

mongoose.connection.dropCollection('orders', (err, result) => {
    console.log("*** orders collection deleted ***");
})

const movie_1 = await Movie.findOne({ title: "Interstellar" });
const movie_2 = await Movie.findOne({ title: "Blade Runner" });
const user = await User.findOne({ username: "rubenfs" });

const orders = [
    new Order({
        userId: user.id,
        movieId: movie_1.id,
        startDate: Date(),
        endDate: Date()
    }),
    new Order({
        userId: user.id,
        movieId: movie_2,
        startDate: Date(),
        endDate: Date()
    }),
];

let done = 0;
for (let i = 0; i < orders.length; i++) {
    orders[i].save((err, result) => {
        done++;
        if (done === orders.length) {
            console.log("Orders seed has been planted!");
            exit();
        }
    });
}

const exit = () => {
    mongoose.disconnect();
}

// To run the seed $ node movies.seeder.js