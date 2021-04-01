import Bcryp from 'bcrypt';

const checkPassword = (req, res, next) => {

    // Password entered by user.
    const password = req.body.password;

    // Password saved in bd
    const queryUser = req.userChecked;

    // Checking password
    if (!Bcryp.compareSync(password, queryUser.password)) {
        return res.send({ message: "Incorrect password" });
    };
    next();
}

export default checkPassword;