import CrudController from '@crudController';
import { Service } from '@models';


const crudController = new CrudController(Service);

const getAllService = async (req, res) => {
    return crudController.getAll(req, res);
};

const updateService = async (req, res) => {
    return crudController.update(req, res);
};

const serviceControllers = {
    getAllService,
    updateService
};

export default serviceControllers;
