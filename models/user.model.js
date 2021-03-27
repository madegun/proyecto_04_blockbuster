import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const user = mongoose.model('users', userSchema)

export default user;