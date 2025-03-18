/*const { DataTypes } = require('sequelize');
const sequelize = require('../models/index'); // Ajusta la ruta si es necesario
const HealthCondition = require('./healthConditionModel');
const User = require('./userModel');

const UserHealthCondition = sequelize.define('UserHealthCondition', {
    idUserHealthCondition: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'idUser'
        },
        allowNull: false // Asegúrate de que este campo no sea nulo
    },
    idHealthCondition: {
        type: DataTypes.INTEGER,
        references: {
            model: HealthCondition,
            key: 'idHealthCondition'
        }, 
        allowNull: true // Permitir null si se usa `otherConditionDescription`
    }, 
    otherConditionDescription: {
        type: DataTypes.TEXT,
        allowNull: true // Este campo solo se llena si idHealthCondition es null
    }
}, {
    tableName: 'user_health_conditions',
    timestamps: false
});

// Asociaciones
User.hasMany(UserHealthCondition, { foreignKey: 'idUser' });
UserHealthCondition.belongsTo(User, { foreignKey: 'idUser' });

HealthCondition.hasMany(UserHealthCondition, { foreignKey: 'idHealthCondition' });
UserHealthCondition.belongsTo(HealthCondition, { foreignKey: 'idHealthCondition' });

module.exports = UserHealthCondition;*/

const { DataTypes } = require('sequelize');
const sequelize = require('../models/index');
const HealthCondition = require('./healthConditionModel');
const User = require('./userModel');

const UserHealthCondition = sequelize.define('UserHealthCondition', {
    idUserHealthCondition: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'idUser'
        },
        allowNull: false
    },
    idHealthCondition: {
        type: DataTypes.INTEGER,
        references: {
            model: HealthCondition,
            key: 'idHealthCondition'
        },
        allowNull: false // No permitir null para evitar registros sin condición
    },
    otherConditionDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isValidCondition(value) {
                if (this.idHealthCondition !== 1 && value) {
                    throw new Error("La descripción solo se permite si la condición seleccionada es 'otros'.");
                }
            }
        }
    }
}, {
    tableName: 'user_health_conditions',
    timestamps: false
});

// Asociaciones
User.hasMany(UserHealthCondition, { foreignKey: 'idUser', onDelete: "CASCADE" });
UserHealthCondition.belongsTo(User, { foreignKey: 'idUser' });

HealthCondition.hasMany(UserHealthCondition, { foreignKey: 'idHealthCondition', onDelete: "CASCADE" });
UserHealthCondition.belongsTo(HealthCondition, { foreignKey: 'idHealthCondition' });

module.exports = UserHealthCondition;
