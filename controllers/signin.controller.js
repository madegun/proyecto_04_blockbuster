import user from '../models/user.model.js';

export const signinController = {

    // Create user with role USER
    createUser: async (req, res) => {

        const username = req.body.username;
        const email = req.body.email;
        const roleId = process.env.USER_ROLE_ID;

        const newUser = {
            username: username,
            email: email,
            roleId: roleId
        }

        await user.create(newUser);
        res.send(`User ${JSON.stringify(newUser)} was added. Role: USER`);
    }
}