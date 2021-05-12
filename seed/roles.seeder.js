import Role from '../models/role.model.js';
import connectDatabase from '../config/connection_db.js';
import dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);

mongoose.connection.dropCollection('roles', (err, result) => {
    console.log("*** roles collection deleted ***");
})

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
            console.log("Roles seed has been planted!");
            exit();
        }
    });
}

const exit = () => {
    mongoose.disconnect();
}