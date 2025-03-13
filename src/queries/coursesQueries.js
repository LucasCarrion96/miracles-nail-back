const Course = require('../models/coursesModel');

async function getCourses() {
    try {
        const courses = await Course.findAll();
        return courses;
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        throw new Error('Error al obtener cursos');
    }
}

async function getCoursesByIds(courseIds) {
    try {
        const courses = await Course.findAll({
            where: {
                idCourse: courseIds
            }
        });
        return courses; // Cambiado a 'return courses'
    } catch (error) {
        console.error('Error al obtener los detalles de los cursos:', error);
        throw new Error('Error al obtener los detalles de los cursos');
    }
}



const coursesQueries = {
    getCourses,
    getCoursesByIds,
};

module.exports = {
    coursesQueries
};
