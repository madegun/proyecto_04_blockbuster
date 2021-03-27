import user from '../models/user.model.js';

export const userController = {
    listUsers: async (req, res) => {
        console.log(`endpoint: /user`);

        const resUsers = await user.find();
        res.json(resUsers);
    },
    findUser: async (req, res) => {
        console.log(`endpoint: /user/:id`);

        const query = req.params.id;
        const resUser = await user.findById(query);
        res.json(resUser)
    },

    createUser: async (req, res) => {
        console.log('endpoint: /user');

        await user.create(req.body);
        res.send(`User ${JSON.stringify(req.body)} was added`)
    }
}