const express = require('express');
const router = express.Router();
const UserCourse = require('../models/userCourseModel'); // Asegúrate de que la ruta es correcta
const Course = require('../models/coursesModel'); // Importa el modelo Course

// Ruta para obtener cursos de un usuario
router.get('/', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: 'El parámetro userId es requerido' });
    }

    try {
        // Obtener los IDs de los cursos del usuario
        const userCourses = await UserCourse.findAll({
            where: { idUser: userId },
            attributes: ['idCourse'] // Solo selecciona idCourse
        });

        if (userCourses.length === 0) {
            return res.json([]); // No hay cursos
        }

        // Extraer los course IDs
        const courseIds = userCourses.map(course => course.idCourse);

        // Obtener detalles de los cursos
        const courses = await Course.findAll({
            where: {
                idCourse: courseIds
            }
        });

        res.json(courses);
    } catch (error) {
        console.error('Error al obtener los cursos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
});

module.exports = router;
