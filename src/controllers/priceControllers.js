const { priceQueries } = require('../queries/priceQueries');


const getAllPrices = async (req, res) => {
    try {
        const prices = await priceQueries.getPrice(); // Cambia 'getPrices' a 'getPrice'
        res.json(prices);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los precios' }); // Ajusta el mensaje de error
    }
};

const priceControllers = {
    getAllPrices,

};

module.exports = {
    priceControllers
};
