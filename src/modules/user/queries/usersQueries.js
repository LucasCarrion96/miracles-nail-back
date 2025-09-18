
import { User, Turns, Course, Service, UserHealthCondition, HealthCondition } from '@models';

// 1. Obtener perfil del usuario
const getUserProfile = async (id) => {
    try {
        // Obtén los datos básicos del usuario
        const user = await User.findOne({
            where: { idUser: id },
            attributes: ['idUser', 'userName', 'userSurname', 'mail', 'profilePicture', 'birthDate', 'phone',],
            include: [
                {
                    model: Course,
                    attributes: ['title', 'category', 'description', 'price', 'duration']
                },
                {
                    model: UserHealthCondition,
                    include: [
                        {
                            model: HealthCondition,
                            attributes: ['healthCondition']
                        }
                    ]
                },
            ]


        });

        if (!user) {
            return null;
        }

        // Obtén los turnos del usuario
        const turns = await Turns.findAll({
            where: { idUser: id },
            attributes: ['idTurns', 'turnDay', 'totalPrice', 'nailArtQuantity', 'caricatureQuantity', '3dQuantity'],
            include: [
                {
                    model: Service,
                    attributes: ['nameService', "price"],
                },
                {
                    model: Service, // Relación con el servicio adicional
                    as: 'AdditionalService', // Alias para diferenciarlo
                    foreignKey: 'idServiceAdd', // La clave foránea en Turns
                    attributes: ['nameService', "price"], // El nombre del servicio adicional

                }

            ]
        });


        return {
            user,
            turns,
        };
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        throw error;
    }
};



async function getUsersWithCourses(page, limit) {

    try {

        const offset = (page - 1) * limit;

        // Obtiene los turnos con límite y desplazamiento (offset)
        const { rows: users, count } = await User.findAndCountAll({
            include: [
                {
                    model: Course,
                    attributes: ['title']
                }
            ],
            limit,      // número de registros por página
            offset      // desplazamiento
        });

        return {
            users,
            totalPages: Math.ceil(count / limit) // calcula el total de páginas
        };
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        throw new Error('Error al obtener turnos');
    }
}

async function getTotalUsers() {
    try {
        const totalUsers = await User.count();
        console.log('Total de usuarios:', totalUsers); // Log para depurar
        return totalUsers;
    } catch (error) {
        console.error('Error al obtener el total de usuarios:', error);
        throw new Error('Error al obtener el total de usuarios');
    }
}


export default {
    getUserProfile,
    getUsersWithCourses,
    getTotalUsers,
};
