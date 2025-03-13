const express = require('express');
const { coursesControllers } = require("../controllers/coursesControllers")
const isAdmin = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// Diseños
router.get('/', isAdmin, coursesControllers.getAllCourses);
router.put('/:idCourse', isAdmin, coursesControllers.updateCourse);

module.exports = router;
