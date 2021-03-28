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

        // console.log(email);
        // console.log(user.email);

        // Verifica si el email está en la base de datos.
        if (user.email === null) {
            displayGandalf(req, res);
        } else if (user.email === email) {
            next();
        }

    } catch (error) {
        // res.send("¡No ... puedes ... PASAR!!!!");
        displayGandalf(req, res);
        // res.sendStatus(401);
    }
}

export default checkJWT;