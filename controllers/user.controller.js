import order from '../models/order.model.js';
import user from '../models/user.model.js';
import displayGandalf from '../utils/displayGandalf.js';
// import jwt from 'jsonwebtoken';

export const userController = {
    listUsers: async (req, res) => {
        console.log("en el list users");
        const resUsers = await user.find();
        res.json(resUsers);
    },

    findUser: async (req, res) => {

        const query = req.params.id;
        const resUser = await user.findById(query);
        res.json(resUser)
    },

    viewUserProfile: async (req, res) => {
        // const query = req.params.email;
        // const user = await getInfoToken(req);
        const queryBody = req.body.email;

        // We can use de req object that we modified in checkUser
        const queryToken = req.userChecked;

        // const token = req.headers.token;
        // const payload = jwt.verify(token, process.env.SECRET);
        // const email = payload.email;

        if (queryToken.email !== queryBody) {
            displayGandalf(req, res);
        } else {
            const userProfile = await user.findOne({ "email": queryBody });
            const orders = await order.find({ "userId": userProfile._id });
            const fullResult = { "profile": userProfile, "orders": orders };
            res.json(fullResult);
        }
    },

    // Create user with role USER
    // createUser: async (req, res) => {

    //     const username = req.body.username;
    //     const email = req.body.email;
    //     const roleId = process.env.USER_ROLE_ID;

    //     const newUser = {
    //         username: username,
    //         email: email,
    //         roleId: roleId
    //     }

    //     await user.create(newUser);
    //     res.send(`User ${JSON.stringify(newUser)} was added. Role: USER`);
    // },

    // Create user with role ADMIN.
    createUserAdmin: async (req, res) => {
        const username = req.body.newUserName;
        const email = req.body.newUserEmail;
        const roleId = process.env.ADMIN_ROLE_ID;

        const newUser = {
            username: username,
            email: email,
            roleId: roleId
        }

        await user.create(newUser);
        res.send(`User ${JSON.stringify(newUser)} was added. Role: ADMIN`);
    },

    deleteUser: async (req, res) => {

        await user.findByIdAndDelete(req.params.id);
        res.send(`User with id ${JSON.stringify(req.params.id)} was deleted`)
    }
}