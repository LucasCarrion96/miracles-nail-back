
import { Turns, User, Service, Schedule, UserHealthCondition, HealthCondition } from "@models";


async function getTurnsByUserId(idUser) {
    try {
        console.log('Consultando turnos para el usuario con ID:', idUser); // Verifica el ID del usuario

        const turns = await Turns.findAll({
            where: { idUser: idUser }, // Filtra por el ID del usuario
            include: [
                {
                    model: User,
                    attributes: ['userName', 'userSurname']
                },
                // Agrega otros modelos relacionados si es necesario
            ]
        });

        console.log('Turnos obtenidos de la base de datos:', turns); // Verifica los turnos obtenidos
        return turns; // Devuelve los turnos encontrados
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        throw new Error('Error al obtener turnos');
    }
}



async function getTurns(page, limit) {

    try {

        const offset = (page - 1) * limit;

        // Obtiene los turnos con límite y desplazamiento (offset)
        const { rows: turns, count } = await Turns.findAndCountAll({
            include: [
                {
                    model: User,
                    attributes: ['userName', 'userSurname'],
                    include: [
                        {
                            model: UserHealthCondition,
                            include: [
                                {
                                    model: HealthCondition,
                                    attributes: ['healthCondition']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Service,
                    as: 'MainService', // alias definido arriba
                    attributes: ['idService', 'nameService']
                },
                {
                    model: Service,
                    as: 'AdditionalService', // alias definido arriba
                    attributes: ['idService', 'nameService']
                },
                {
                    model: Schedule,
                    attributes: ['timeSchedule']
                }
            ],
            limit,
            offset
        });

        return {
            turns,
            totalPages: Math.ceil(count / limit) // calcula el total de páginas
        };
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        throw new Error('Error al obtener turnos');
    }
}


export default {
    getTurnsByUserId,
    getTurns,
};
