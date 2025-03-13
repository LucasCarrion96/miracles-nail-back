
const ArtType = require('../models/artTypeModel');
const CrudController = require('./baseController/crudController');

const crudController = new CrudController(ArtType);

const getAllArtType = async (req, res) => {
    return crudController.getAll(req, res);
};

const updateArtType = async (req, res) => {
    return crudController.update(req, res);
};

const artTypeControllers = {
    getAllArtType,
    updateArtType
};

module.exports = {
    artTypeControllers
};

/**
 const { artTypeQueries } = require('../bd/queries/artTypeQueries');
const ArtType = require('../models/artTypeModel');
const CrudController = require ('./baseController/crudController')

const getAllArtType = async (req, res) => {
    try {
        const artType = await artTypeQueries.getArtType();
        res.json(artType)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los diseños' });

    }
}

const updateArtType = async (req, res) => {
    const { idArtType } = req.params; // Cambio `id` a `idArtType` para que coincida con la ruta
    const { artTypeName, price } = req.body;

    console.log("ID a actualizar:", idArtType);
    console.log("Datos para actualización:", { artTypeName, price });

    try {
        const [updated] = await ArtType.update(
            { artTypeName, price },
            { where: { idArtType } }
        );

        console.log("Filas actualizadas:", updated);

        if (updated) {
            const updatedArtType = await ArtType.findOne({ where: { idArtType } });
            return res.status(200).json(updatedArtType);
        }

        // Si no se encuentra el registro o no se actualiza, envía un 404
        res.status(404).json({ message: 'ArtType no encontrado o sin cambios' });
    } catch (error) {
        console.error("Error en la actualización:", error); // Agrega log para depurar el error
        res.status(500).json({ message: 'Error al actualizar el ArtType', error });
    }
};

const artTypeController = {
    getAllArtType,
    updateArtType
}

module.exports = {
    artTypeController
}
 */