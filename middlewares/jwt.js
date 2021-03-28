import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import displayGandalf from '../utils/displayGandalf.js';

// Verificando token
const checkJWT = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const payload = jwt.verify(token, process.env.SECRET);

        const email = payload.email;
        const user = await User.findOne({ "email": email });

        // console.log(user.username);
        // console.log(email);
        // console.log(typeof String(user.roleId));

        // Haciendo uso de roles:
        // admin: 605e3c1727c76e28fd4ae7d0
        // user: 605e3c2f27c76e28fd4ae7e8

        // check if admin
        if (user.email === null) {
            displayGandalf(req, res);
        } else if (String(user.roleId) !== "605e3c1727c76e28fd4ae7d0") {
            displayGandalf(req, res);
        } else {
            next();
        }

    } catch (error) {
        // res.send("¡No ... puedes ... PASAR!!!!");
        displayGandalf(req, res);
        // res.sendStatus(401);
    }
}

export default checkJWT;