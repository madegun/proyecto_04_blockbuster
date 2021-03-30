import displayGandalf from '../utils/displayGandalf.js';
import getInfoToken from '../utils/getInfoToken.js';

// Verifying if user has admin role using token
const checkAdmin = async (req, res, next) => {
    try {

        const adminRoleId = process.env.ADMIN_ROLE_ID;

        // Retrieve the user
        const user = await getInfoToken(req);

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