import { UserCourse, Course } from '@models';

export const getCoursesByUserId = async (userId) => {
    const userCourses = await UserCourse.findAll({
        where: { idUser: userId },
        attributes: ['idCourse']
    });

    if (userCourses.length === 0) return [];

    const courseIds = userCourses.map(course => course.idCourse);

    const courses = await Course.findAll({
        where: { idCourse: courseIds }
    });

    return courses;
};