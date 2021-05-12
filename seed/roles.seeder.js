import Role from '../models/role.model.js';
import connectDatabase from '../config/connection_db.js';
import dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);
// connectDatabase('localhost', 27017, 'blockbuster_seed');

const roles = [
    new Role({
        role: "admin"
    }),
    new Role({
        role: "user"
    })
];

let done = 0;
for (let i = 0; i < roles.length; i++) {
    roles[i].save((err, result) => {
        done++;
        if (done === roles.length) {
            exit();
        }
    });
}

const exit = () => {
    mongoose.disconnect();
}