const Service = require('../models/serviceModel');
const CrudController = require('./baseController/crudController');

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

module.exports = {
    serviceControllers
};
