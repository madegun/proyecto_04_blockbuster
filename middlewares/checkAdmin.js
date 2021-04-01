import displayGandalf from '../utils/displayGandalf.js';

// Verifying if user has admin role using token
const checkAdmin = async (req, res, next) => {
    try {
        console.log(req.userChecked);
        console.log("Verifying admin privileges...");
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
    }
}

export default checkAdmin;