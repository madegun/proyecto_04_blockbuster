import express, { Router } from 'express';

import userRoutes from './routes/user.routes.js';
import movieRoutes from './routes/movies.routes.js';
import orderRoutes from './routes/order.routes.js';
import signupRoutes from './routes/signin.routes.js';
import authRoutes from './routes/auth.routes.js';

import connectDatabase from './config/connection_db.js';

import dotenv from 'dotenv';
import infoMiddleware from './middlewares/info.js';
// import checkUser from './middlewares/checkUser.js';

// import checkJWT from './middlewares/jwt.js';

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

// Simple middleware showing us some basic information
app.use(infoMiddleware);

// Single signup endpoint. No middlewares needed.
app.use('/signup', signupRoutes);

// Once you have registered, you can get a JWT.
app.use('/auth', authRoutes);

// app.use('/user', checkJWT, userRoutes);

// Master routes. 
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/order', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})