import Bcryp from 'bcrypt';

const checkPassword = (req, res, next) => {

    try {
        // Password entered by user.
        const password = req.body.password;

        // Password saved in bd
        const queryUser = req.userChecked;

        // Checking password
        if (!Bcryp.compareSync(password, queryUser.password)) {
            return res.send({ message: "Incorrect password" });
        };
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }

}

export default checkPassword;