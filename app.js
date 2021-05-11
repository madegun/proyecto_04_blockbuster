import express from 'express';

import connectDatabase from './config/connection_db.js';

import userRoutes from './routes/user.routes.js';
import movieRoutes from './routes/movies.routes.js';
import orderRoutes from './routes/order.routes.js';
import signupRoutes from './routes/signup.routes.js';
import authRoutes from './routes/auth.routes.js';

import infoMiddleware from './middlewares/info.js';

import dotenv from 'dotenv';
import checkUser from './middlewares/checkUser.js';
import checkPassword from './middlewares/checkPassword.js';

import cors from 'cors';

// https://www.youtube.com/watch?v=apouPYPh_as&ab_channel=BeyondHelloWorld
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './documentation/swagger.options.js'

// App port
const port = 3000;

// Initialize de swaggerjs doc AWAIT is mandatory.
const specs = await swaggerJsdoc(swaggerOptions(port));

// Init express
const app = express();

// Swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Init dotenv
dotenv.config();

// Able to receive JSON on body request
app.use(express.json());
app.use(cors());

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

// Master routes. 
app.use('/users', [checkUser, checkPassword], userRoutes);
app.use('/movies', movieRoutes);
app.use('/orders', [checkUser, checkPassword], orderRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

export default app;