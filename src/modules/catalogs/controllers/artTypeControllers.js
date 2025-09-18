
import { ArtType } from '@models'; // si exportás así

import CrudController from '@crudController';

const crudController = new CrudController(ArtType);

const getAllArtType = (req, res) => crudController.getAll(req, res);
const updateArtType = (req, res) => crudController.update(req, res);
const artTypeControllers = {
    getAllArtType,
    updateArtType
};

export default
    artTypeControllers
    ;

