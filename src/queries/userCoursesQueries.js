const UserCourse = require('../models/userCourse'); // Asegúrate de importar tu modelo

async function getUserCourseIds(userId) {
    try {
        // Usar Sequelize para encontrar los cursos asociados al usuario
        const userCourses = await UserCourse.findAll({
            where: {
                idUser: userId
            },
            attributes: ['idCourse'] // Solo selecciona el idCourse
        });

        // Extraer los idCourse de los resultados
        const courseIds = userCourses.map(course => course.idCourse);
        return courseIds;
    } catch (error) {
        console.error('Error al obtener los courseIds del usuario:', error);
        throw new Error('Error al obtener los courseIds del usuario');
    }
}

module.exports = {
    getUserCourseIds,
};