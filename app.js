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


// Options object for SWAGGER
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Blockbuster API",
            version: "1.0.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                // In our case, we specified only one server where documentation will be available
                url: "http://localhost:3000"
            }
        ]
    },
    // apis: ["app.js"],
    // This specifies to swagger where it
    apis: ["./routes/*.js"],
};

// Initialize de swaggerjs doc
const specs = await swaggerJsdoc(options);

// Init express
const app = express();

// Swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Init dotenv
dotenv.config();

// Able to receive JSON on body request
app.use(express.json());
app.use(cors());

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
/**
 * 
 * @openapi
 *  /signup
 *      post:
 *          responses:
 *              200:
 *                  description:
 *                      Welcome
 * 
 */
app.use('/signup', signupRoutes);

// Once you have registered, you can get a JWT.
app.use('/auth', authRoutes);

// app.use('/user', checkJWT, userRoutes);

// Master routes. 
app.use('/users', [checkUser, checkPassword], userRoutes);
app.use('/movies', movieRoutes);
app.use('/orders', [checkUser, checkPassword], orderRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})