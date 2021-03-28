import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose'
import userRoutes from './routes/user.routes.js';
import movieRoutes from './routes/movies.routes.js';
import orderRoutes from './routes/order.routes.js';

import authRoutes from './routes/auth.routes.js';
import connectDatabase from './config/connection_db.js';
// import orderRoutes from './routes/order.routes.js';
import dotenv from 'dotenv';

// Init express
const app = express();

// Init dotenv
dotenv.config();

// Able to receive JSON on body request
app.use(express.json());

// App port
const port = 3000;

// Connection to mongodb
const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);

// CORS
// app.use(cors());

// Middleware => Nos muestra la fecha, el tipo de petición y la url a la que se ha hecho una petición.
app.use((req, res, next) => {
    let date = new Date();
    console.log(`Time: ${date.toDateString()}
    Request Type: ${req.method}
    Request URL: ${req.originalUrl}`);
    next();
})


// La garita
app.use('/auth', authRoutes);

// Esto es un master route.
// app.use('/user', checkJWT, userRoutes);

// Master route
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/order', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})