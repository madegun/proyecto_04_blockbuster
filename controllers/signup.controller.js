import user from '../models/user.model.js';

export const signupController = {

    // Create user with role USER
    createUser: async (req, res) => {

        const username = req.body.username;
        const email = req.body.email;
        const roleId = process.env.USER_ROLE_ID;

        // search if user exists in db, base on email.
        const userdb = await user.findOne({ email: email });

        // Check if email has been already registered.
        if (userdb) {
            res.send("User already exists")
        } else {
            const newUser = {
                username: username,
                email: email,
                roleId: roleId
            }

            await user.create(newUser);
            res.send(`User ${JSON.stringify(newUser)} was added. Role: USER`);
        }
    }
}