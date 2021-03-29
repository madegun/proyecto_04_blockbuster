import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import displayGandalf from '../utils/displayGandalf.js';

// Verificando token
const checkAdmin = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const payload = jwt.verify(token, process.env.SECRET);

        const email = payload.email;
        const user = await User.findOne({ "email": email });

        const adminRoleId = process.env.ADMIN_ROLE_ID;

        // check if admin
        if (user.email === null) {
            displayGandalf(req, res);
        } else if (String(user.roleId) !== adminRoleId) {
            displayGandalf(req, res);
        } else {
            next();
        }

    } catch (error) {
        displayGandalf(req, res);
        // res.sendStatus(401);
    }
}

export default checkAdmin;