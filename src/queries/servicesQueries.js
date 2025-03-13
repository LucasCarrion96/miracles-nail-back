const Service = require('../models/serviceModel'); // Ajusta la ruta si es necesario

async function getServices() {
    try {
        const services = await Service.findAll();
        return services;
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        throw new Error('Error al obtener servicios');
    }
}

const servicesQueries = {
    getServices
}

module.exports = {
    servicesQueries
};