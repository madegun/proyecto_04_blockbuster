import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import displayGandalf from '../utils/displayGandalf.js';

// Verificando token
const checkUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const payload = jwt.verify(token, process.env.SECRET);

        const email = payload.email;
        const user = await User.findOne({ "email": email });

        // check if user exists
        if (user.email === null) {
            displayGandalf(req, res);
        } else if (String(user.email) !== req.body.email) {
            displayGandalf(req, res);
        } else {
            next();
        }

    } catch (error) {
        displayGandalf(req, res);
        // res.sendStatus(401);
    }
}

export default checkUser;