
const Service = require('../models/serviceModel'); // Ajusta la ruta si es necesario
const ArtType = require('../models/artTypeModel');



async function getPrice() {
    try {
        const [services, artTypes] = await Promise.all([
            Service.findAll(),
            ArtType.findAll(),
        ]);
        return {
            services,
            artTypes,
        };
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        throw new Error('Error al obtener servicios');
    }
}

const priceQueries = {
    getPrice,

};

module.exports = {
    priceQueries
};
