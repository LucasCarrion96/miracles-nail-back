import { getCoursesByUserId } from '../queries/userCoursesQueries';

export const getUserCourses = async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: 'El parámetro userId es requerido' });
    }

    try {
        const courses = await getCoursesByUserId(userId);
        res.json(courses);
    } catch (error) {
        console.error('Error al obtener los cursos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
};