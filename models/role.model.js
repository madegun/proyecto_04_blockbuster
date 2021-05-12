import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    role: String,
})

const Role = mongoose.model('roles', roleSchema)

export default Role;