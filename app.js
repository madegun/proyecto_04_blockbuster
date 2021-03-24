import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes.js';
// import orderRoutes from './routes/order.routes.js';

// Iniziatilze express
const app = express();

// Able to receive JSON on body request
app.use(express.json());
const port = 3000;

// Connection to mongodb
try {
    await mongoose.connect('mongodb://localhost:27017/blockbuster', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    console.log('mongodb connected');
} catch (e) {
    console.log(e);
}

// CORS
app.use(cors());

// Middleware => Nos muestra la fecha, el tipo de petición y la url a la que se ha hecho una petición.
app.use((req, res, next) => {
    let date = new Date();
    console.log(`Time: ${date.toDateString()}
    Request Type: ${req.method}
    Request URL: ${req.originalUrl}`);
    next();
})

// Esto es un master route.
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})