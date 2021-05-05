import order from '../models/order.model.js';
import user from '../models/user.model.js';

// This controller groups all methods related to orders
export const orderController = {

    // Lists all orders of all users.
    listOrders: async (req, res) => {

        try {
            const resOrders = await order.find();
            res.json(resOrders);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }

    },

    // This method creates an order recovering the movieId and user email from body and assigns startDate and endDate based on current date.
    createOrder: async (req, res) => {

        try {
            const userEmail = req.body.email;
            const movieId = req.body.movieId;

            const startDate = new Date();
            const days = parseInt(process.env.BASIC_ORDER);

            // This part generate de return date using the current date.
            const getEndDate = () => {
                let endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + days);
                return endDate;
            };

            const objectUser = await user.findOne({ "email": userEmail });

            const newOrder = {
                userId: objectUser._id,
                movieId: movieId,
                startDate: startDate,
                endDate: getEndDate(),
            }

            await order.create(newOrder);
            res.json(`Order ${JSON.stringify(newOrder)} was created`);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

    // This method allows users to display their orders based on is email.
    listUserOrders: async (req, res) => {

        try {
            const userEmail = req.body.email;
            const objectUser = await user.findOne({ "email": userEmail });
            const orders = await order.find({ "userId": objectUser._id });
            res.json(orders);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }

    }
}