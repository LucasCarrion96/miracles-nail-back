export default (sequelize, DataTypes) => {
    const UserHealthCondition = sequelize.define('UserHealthCondition', {
        idUserHealthCondition: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idHealthCondition: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        otherConditionDescription: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'user_health_conditions',
        timestamps: false,

    });

    UserHealthCondition.associate = (models) => {
        UserHealthCondition.belongsTo(models.User, { foreignKey: 'idUser' });
        UserHealthCondition.belongsTo(models.HealthCondition, {
            foreignKey: 'idHealthCondition',
            allowNull: true // Mantiene la flexibilidad para condiciones personalizadas
        });
    };

    return UserHealthCondition;
};
/*
const { DataTypes } = require('sequelize');
const sequelize = require('../models/index')
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
*/