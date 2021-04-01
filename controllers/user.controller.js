import order from '../models/order.model.js';
import user from '../models/user.model.js';
import displayGandalf from '../utils/displayGandalf.js';
import Bcryp from 'bcrypt';
import { request } from 'express';

// This controller groups all methods related to users.
export const userController = {
    listUsers: async (req, res) => {
        const resUsers = await user.find();
        res.json(resUsers);
    },

    findUser: async (req, res) => {
        const query = req.params.id;
        const resUser = await user.findById(query);
        res.json(resUser)
    },

    viewUserProfile: async (req, res) => {
        const queryBody = req.body.email;

        // We can use de req object that we modified in checkUser
        const queryToken = req.userChecked;

        if (queryToken.email !== queryBody) {
            displayGandalf(req, res);
        } else {
            const userProfile = await user.findOne({ "email": queryBody });
            const orders = await order.find({ "userId": userProfile._id });
            const fullResult = { "profile": userProfile, "orders": orders };
            res.json(fullResult);
        }
    },

    // Create user with role USER.
    createUser: async (req, res) => {

        const username = req.body.newUserName;
        const email = req.body.newUserEmail;
        const roleId = process.env.USER_ROLE_ID;
        const password = Bcryp.hashSync(request.body.password, 4);

        // Search if user already exists in db.
        const userdb = await user.findOne({ email: email });

        // If user does not exist, create it.
        if (userdb) {
            res.send("User already exits");
        } else {
            const newUser = {
                username: username,
                email: email,
                roleId: roleId,
                password: password
            }
            await user.create(newUser);
            res.send(`User ${JSON.stringify(newUser)} was added. Role: USER`);
        }
    },

    // Create user with role ADMIN.
    createUserAdmin: async (req, res) => {
        const username = req.body.newUserName;
        const email = req.body.newUserEmail;
        const roleId = process.env.ADMIN_ROLE_ID;

        // Search if user already exists in db.
        const userdb = await user.findOne({ email: email });

        // If user does not exist, create it.
        if (userdb) {
            res.send("User already exits");
        } else {
            const newUser = {
                username: username,
                email: email,
                roleId: roleId
            }

            await user.create(newUser);
            res.send(`User ${JSON.stringify(newUser)} was added. Role: ADMIN`);
        }
    },

    // Delete user by Id
    deleteUser: async (req, res) => {

        await user.findByIdAndDelete(req.params.id);
        res.send(`User with id ${JSON.stringify(req.params.id)} was deleted`)
    }
}