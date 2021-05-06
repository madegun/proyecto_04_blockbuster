import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    title: String,
    year: Number,
    available: Boolean,
    cast: Array,
    genre: Array,
})

const movie = mongoose.model('movies', movieSchema)

export default movie;