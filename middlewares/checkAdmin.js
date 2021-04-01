import user from '../models/user.model.js';
import displayGandalf from '../utils/displayGandalf.js';
// import getInfoToken from '../utils/getInfoToken.js';

// Verifying if user has admin role using token
const checkAdmin = async (req, res, next) => {
    try {
        console.log("In checkadmin");
        const adminRoleId = process.env.ADMIN_ROLE_ID;
        const user = req.userChecked;

        // Why can't i use !== and === although i convert object to string in id?
        if (user.roleId != adminRoleId) {
            // res.send("You're not admin");
            displayGandalf(req, res);
        } else if (user.roleId == adminRoleId) {
            next();
        };

    } catch (error) {
        displayGandalf(req, res);
        // res.sendStatus(401);
    }
}

export default checkAdmin;