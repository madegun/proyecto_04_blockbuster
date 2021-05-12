import User from '../models/user.model.js';
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
    new User({

    }),
    new User({

    }),
    new User({

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