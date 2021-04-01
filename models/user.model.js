import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles'
    }
})

const user = mongoose.model('users', userSchema)

export default user;