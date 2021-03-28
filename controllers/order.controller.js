import order from '../models/order.model.js';
// import dotenv from 'dotenv';

export const orderController = {
    listOrders: async (req, res) => {
        console.log(`endpoint: /user`);

        const resOrders = await order.find();
        res.json(resOrders);
    },

    createOrder: async (req, res) => {

        const movieId = req.body.movieId;
        const userId = req.body.userId;

        const startDate = new Date();
        const days = parseInt(process.env.BASIC_ORDER);

        const getEndDate = () => {
            let endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + days);
            return endDate;
        };

        const newOrder = {
            userId: userId,
            movieId: movieId,
            startDate: startDate,
            endDate: getEndDate(),
        }

        await order.create(newOrder);
        res.json(`Order ${JSON.stringify(newOrder)} was created`);
    }
}

// Agregar pedido en mongodb
// var myDate = new Date(2014, 11, 12, 14, 12);
// db.collection.insert({ "date": myDate });

// Crear pedido
