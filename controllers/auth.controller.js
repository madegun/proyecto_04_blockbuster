import jwt from 'jsonwebtoken';

export const authController = {
    auth: (req, res) => {

        const username = req.body.username
        const email = req.body.email;

        const payload = {
            username: username,
            email: email
        }
        const secret = process.env.SECRET;

        const token = jwt.sign(payload, secret);

        res.json({ token });
    }
}