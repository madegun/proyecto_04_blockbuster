import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Simple function to get info from JWT. When the token is included in the header, it returns the complete object user.
const getInfoToken = async (req) => {

    const token = req.headers.token;
    const payload = jwt.verify(token, process.env.SECRET);

    const email = payload.email;
    const user = await User.findOne({ "email": email });

    return user;
}

export default getInfoToken;