import displayGandalf from '../utils/displayGandalf.js';
import getInfoToken from '../utils/getInfoToken.js'

// Verifying if user is in db using the token 
const checkUser = async (req, res, next) => {
    try {

        // Retrieve the user
        const user = getInfoToken(req);

        // check if user
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