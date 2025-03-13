const { scheduleQueries } = require('../queries/scheduleQueries');



const getUnavailableTimes = async (req, res) => {
    const { year, month, day } = req.params;

    console.log('Consultando horarios no disponibles para:', year, month, day);

    try {
        const unavailableTimes = await scheduleQueries.getUnavailableTimes(year, month, day);
        res.setHeader('Cache-Control', 'no-store'); // Deshabilitar caché
        res.json(unavailableTimes);
    } catch (error) {
        console.error('Error al obtener los horarios ocupados:', error);
        res.status(500).json({ message: 'Error al obtener los horarios ocupados' });
    }
};

async function getFullDays(req, res) {
    const { year, month } = req.params;

    try {
        // Llamamos a la función de consulta para obtener los días completos
        const fullDays = await scheduleQueries.getFullDays(year, month);
        res.json(fullDays); // Regresamos los días completos al cliente
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving full days data' });
    }
}

const scheduleControllers = {
    getUnavailableTimes,
    getFullDays
};

module.exports = {
    scheduleControllers
};
