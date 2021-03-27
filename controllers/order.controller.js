import order from '../models/order.model.js';

export const orderController = {
    listOrders: async (req, res) => {
        console.log(`endpoint: /user`);

        const resOrders = await order.find();
        res.json(resOrders);
    },

    createOrder: (req, res) => {
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        const startDate = new Date();
        const endDate = addDays(startDate, 3);
        var i = `${startDate} : ${endDate}`;
        res.send(i);
    }
}

// Agregar pedido en mongodb
// var myDate = new Date(2014, 11, 12, 14, 12);
// db.collection.insert({ "date": myDate });

// Crear pedido
