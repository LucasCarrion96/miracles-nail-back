const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Ajusta la ruta si es necesario

const HealthCondition = sequelize.define('HealthCondition', {
    idHealthCondition: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    healthCondition: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    // Agrega otros campos necesarios
}, {
    tableName: 'health_conditions',
    timestamps: false
});


module.exports = HealthCondition;