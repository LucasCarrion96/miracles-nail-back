const Turns = require('../models/turnsModel');
const User = require('../models/userModel');
const Service = require('../models/serviceModel'); // Ajusta la ruta si es necesario
const Schedule = require('../models/scheduleModel');
const UserHealthCondition = require('../models/userHealthConditionModel');
const HealthCondition = require('../models/healthConditionModel');



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
                    attributes: ['nameService']
                },
                {
                    model: Schedule,
                    attributes: ['timeSchedule']
                }
            ],
            limit,      // número de registros por página
            offset      // desplazamiento
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




const turnsQueries = {
    getTurnsByUserId,
    getTurns,
};

module.exports = {
    turnsQueries
};
