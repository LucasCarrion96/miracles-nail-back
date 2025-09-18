import { bulkCreateUserHealthConditions } from '../queries/healthConditionsQueries.js';

const createHealthConditions = async (req, res) => {
    const { userId, healthConditions, otherHealthCondition } = req.body;

    try {
        const userHealthConditions = [];

        for (const conditionId of healthConditions) {
            userHealthConditions.push({
                idUser: userId,
                idHealthCondition: conditionId,
                otherConditionDescription: null
            });
        }

        if (otherHealthCondition) {
            userHealthConditions.push({
                idUser: userId,
                idHealthCondition: 1,
                otherConditionDescription: otherHealthCondition
            });
        }

        await bulkCreateUserHealthConditions(userHealthConditions);

        res.status(200).json({ message: 'Condiciones de salud registradas correctamente.' });
    } catch (err) {
        console.error("Error al guardar las condiciones de salud:", err);
        res.status(500).json({ message: 'Error al guardar las condiciones de salud. Inténtalo de nuevo.' });
    }
};

export default { createHealthConditions };