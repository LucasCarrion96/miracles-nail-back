const ArtType = require('../models/artTypeModel'); // Ajusta la ruta si es necesario

async function getArtType() {
    try {
        const artType = await ArtType.findAll();
        return artType;
    } catch (error) {
        console.error('Error al obtener Diseños:', error);
        throw new Error('Error al obtener Diseños');
    }
}

const artTypeQueries = {
    getArtType
}

module.exports = {
    artTypeQueries
};