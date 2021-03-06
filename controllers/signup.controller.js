import User from '../models/user.model.js';
import Bcryp from 'bcrypt';

// This controller only has one method. It creates a user with user role, from body data.
export const signupController = {

    // Create user with role USER
    createUser: async (req, res) => {

        try {
            const username = req.body.username;
            const email = req.body.email;
            const roleId = process.env.USER_ROLE_ID;
            const password = Bcryp.hashSync(req.body.password, 4);

            // Search if user exists in db, base on email.
            const userdb = await User.findOne({ email: email });

            // Check if email has been already registered.
            if (userdb) {
                res.status(409).send("User already exists")
            } else {
                const newUser = {
                    username: username,
                    email: email,
                    roleId: roleId,
                    password: password
                }

                await User.create(newUser);
                res.send(`User ${JSON.stringify(newUser)} was added. Role: USER`);
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }



    }
}