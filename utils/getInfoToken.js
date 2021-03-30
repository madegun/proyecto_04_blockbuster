import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const getInfoToken = async (req) => {

    const token = req.headers.token;
    const payload = jwt.verify(token, process.env.SECRET);

    const email = payload.email;
    const user = await User.findOne({ "email": email });

    return user;
}

export default getInfoToken;