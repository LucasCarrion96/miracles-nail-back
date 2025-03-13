const Course = require('../models/coursesModel');
const CrudController = require('./baseController/crudController');

const crudController = new CrudController(Course);

const getAllCourses = async (req, res) => {
    return crudController.getAll(req, res);
};

const updateCourse = async (req, res) => {
    return crudController.update(req, res);
};

const coursesControllers = {
    getAllCourses,
    updateCourse
};

module.exports = {
    coursesControllers
};