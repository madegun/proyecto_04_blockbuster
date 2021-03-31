import user from '../models/user.model.js';
import displayGandalf from '../utils/displayGandalf.js';
import getInfoToken from '../utils/getInfoToken.js';

// Verifying if user has admin role using token
const checkAdmin = async (req, res, next) => {
    try {
        console.log("checking admin");
        const adminRoleId = process.env.ADMIN_ROLE_ID;

        const user = req.userChecked;

        if (user.roleId !== adminRoleId) {
            displayGandalf(req, res);
            // res.send("You're not admin");
            // displayGandalf(req, res);
        } else if (user.roleId === adminRoleId) {
            next()
        };

    } catch (error) {
        displayGandalf(req, res);
        // res.sendStatus(401);
    }
}

export default checkAdmin;