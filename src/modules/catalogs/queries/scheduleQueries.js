
import { Sequelize, Op } from 'sequelize';
import { Turns } from '@models';

async function getUnavailableTimes(year, month, day) {
    try {
        const date = new Date(year, month - 1, day);  // Construye la fecha en formato YYYY-MM-DD
        const formattedDate = date.toISOString().split('T')[0];  // Formato YYYY-MM-DD

        // Obtén los turnos ocupados para ese día, sin tener en cuenta la hora
        const occupiedTurns = await Turns.findAll({
            where: {
                // Aquí usamos el método `Op.substring` para buscar solo la parte de la fecha (sin hora)
                turnDay: {
                    [Op.substring]: formattedDate  // Solo la fecha sin hora
                }
            },
            attributes: ['idSchedule'],
        });

        // Extraemos los horarios ocupados de los turnos encontrados
        const unavailableTimes = occupiedTurns.map(turn => turn.idSchedule);

        return unavailableTimes;
    } catch (error) {
        console.error('Error al obtener los horarios ocupados:', error);
        throw new Error('Error al obtener los horarios ocupados');
    }
}


async function getFullDays(year, month) {
    try {
        // Filtrar los días completos de lunes a viernes
        const fullDays = await Turns.findAll({
            attributes: [
                'turnDay',
                [Sequelize.fn('COUNT', Sequelize.col('idTurns')), 'occupied_turns']
            ],
            where: {
                turnDay: {
                    [Op.substring]: `${year}-${month}`,  // Filtra solo por la fecha (sin hora)
                },
                idSchedule: {
                    [Op.in]: [1, 2, 3, 4] // Solo los horarios de lunes a viernes
                }
            },
            group: ['turnDay'],
            having: Sequelize.literal('COUNT(DISTINCT idSchedule) = 4') // Verifica que estén ocupados los 4 horarios de lunes a viernes
        });

        // Filtrar los días completos para los sábados (solo idSchedule 5 y 6)
        const fullDaysSaturday = await Turns.findAll({
            attributes: [
                'turnDay',
                [Sequelize.fn('COUNT', Sequelize.col('idTurns')), 'occupied_turns']
            ],
            where: {
                turnDay: {
                    [Op.substring]: `${year}-${month}`,
                },
                idSchedule: {
                    [Op.in]: [5, 6]
                },
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('DAYOFWEEK', Sequelize.col('turnDay')), 7)
                ]
            },
            group: ['turnDay'],
            having: Sequelize.literal('COUNT(DISTINCT idSchedule) = 2') // Verifica que estén ocupados los 2 horarios del sábado
        });

        // Unir los días completos de lunes a viernes y sábados
        return [
            ...fullDays.map(d => d.turnDay),
            ...fullDaysSaturday.map(d => d.turnDay)
        ];
    } catch (error) {
        console.error('Error al obtener los días completos:', error);
        throw new Error('Error al obtener los días completos');
    }
}

export const scheduleQueries = {
    getUnavailableTimes,
    getFullDays
};