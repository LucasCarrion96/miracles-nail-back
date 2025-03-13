const { DataTypes } = require('sequelize');
const sequelize = require('../models/index');

const UserRol = sequelize.define('UserRol', {
    idUserRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userRol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName: 'users_roles',
    timestamps: false
});

module.exports = UserRol;