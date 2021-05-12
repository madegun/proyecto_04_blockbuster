import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies'
    },
    startDate: String,
    endDate: String,
})

const Order = mongoose.model('orders', orderSchema)

export default Order;