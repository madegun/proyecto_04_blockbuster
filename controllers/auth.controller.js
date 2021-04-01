import jwt from 'jsonwebtoken';
import user from '../models/user.model.js';
import Bcryp from 'bcrypt';

// This controller gives a token to the user if this one has been registered previously
export const authController = {
    auth: async (req, res) => {

        const username = req.body.username
        const email = req.body.email;
        const password = req.body.password;

        // Generating JWT IF user is ALREADY registered.
        // Note that we can't use checkUser middleware in this part because we have not yet generated the token.
        try {
            const queryUser = await user.findOne({ email: email });

            if (!queryUser) {
                return res.send({ message: "User is not registered (email)" });
            }
            // if (!Bcryp.compareSync(password, queryUser.password)) {
            //     return res.send({ message: "Incorrect password" });
            // };

            const payload = {
                username: username,
                email: email
            }
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret);

            res.json({ token });
        } catch (error) {
            console.log(error);
            res.send("Something was wrong");
        }

    }
}