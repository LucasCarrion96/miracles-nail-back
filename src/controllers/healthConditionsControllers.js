const UserHealthCondition = require("../models/userHealthConditionModel");


const createHealthConditions = async (req, res) => {
    const { userId, healthConditions, otherHealthCondition } = req.body;

    try {
        const userHealthConditions = [];

        // Registrar las condiciones de salud seleccionadas
        for (const conditionId of healthConditions) {
            userHealthConditions.push({
                idUser: userId,
                idHealthCondition: conditionId, // El id de la condición de salud seleccionada
                otherConditionDescription: null // No es necesario agregar descripción si es una condición predefinida
            });
        }

        // Si se seleccionó 'otra condición de salud', añadirla con la descripción
        if (otherHealthCondition) {
            userHealthConditions.push({
                idUser: userId,
                idHealthCondition: 1, // Asumo que '1' es el id para "otra condición"
                otherConditionDescription: otherHealthCondition
            });
        }

        // 4️⃣ Guardar las condiciones de salud del usuario
        await UserHealthCondition.bulkCreate(userHealthConditions);

        return res.status(200).json({ message: 'Condiciones de salud registradas correctamente.' });
    } catch (err) {
        console.error("Error al guardar las condiciones de salud:", err);
        return res.status(500).json({ message: 'Error al guardar las condiciones de salud. Inténtalo de nuevo.' });
    }
};

const healthConditionsControllers = {
    createHealthConditions
}

module.exports = {
    healthConditionsControllers
};