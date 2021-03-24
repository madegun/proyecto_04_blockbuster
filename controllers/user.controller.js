import user from '../models/user.model.js';

export const userController = {
    list: async (req, res) => {
        console.log(`endpoint: /user`);

        const resUsers = await user.find();
        res.json(resUsers);
        // res.send("It Works!");
    },

    create: () => {
        // Aquí va la lógica del create
    }
}