const { DataTypes } = require('sequelize');
const sequelize = require('../models/index'); // Ajusta la ruta si es necesario

const Schedule = sequelize.define('Schedule', {
    idSchedule: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    timeSchedule: {
        type: DataTypes.TIME,
        allowNull: false
    },

    // Agrega otros campos necesarios
}, {
    tableName: 'schedule',
    timestamps: false
});

module.exports = Schedule;