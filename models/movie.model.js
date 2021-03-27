import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    title: String,
    year: Number,
    available: Boolean,
})

const movie = mongoose.model('movies', userSchema)

export default movie;