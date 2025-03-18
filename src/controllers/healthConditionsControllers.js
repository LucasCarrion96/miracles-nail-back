const UserHealthCondition = require("../models/userHealthCondition");
const sequelize = require("../config/database");

const createHealthConditions = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { userId, healthConditions } = req.body;

        if (!userId || !healthConditions || healthConditions.length === 0) {
            return res.status(400).json({ message: "Datos insuficientes" });
        }

        const healthData = healthConditions.map(condition => ({
            idUser: userId,
            idHealthCondition: condition.id,
            otherConditionDescription: condition.id === 1 ? condition.description : null
        }));

        await UserHealthCondition.bulkCreate(healthData, { transaction });

        await transaction.commit();
        res.status(201).json({ message: "Condiciones de salud registradas con éxito" });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Error al registrar condiciones de salud", error: error.message });
    }
};

module.exports = {
    createHealthConditions
};
