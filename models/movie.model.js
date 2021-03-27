import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    title: String,
    year: Number,
    available: Boolean,
})

const movie = mongoose.model('movies', movieSchema)

export default movie;