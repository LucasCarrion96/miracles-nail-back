const { DataTypes } = require('sequelize');
const sequelize = require('../models/index'); // Ajusta la ruta si es necesario
const UserRol = require('./userRolModel')

const User = sequelize.define('User', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userSurname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
    },
    birthDate: {
        type: DataTypes.DATE
    },
    profilePicture: {
        type: DataTypes.STRING
    },
    userPass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.INTEGER,
        defaultValue: true
    },
    userRol: {
        type: DataTypes.INTEGER,
        references: {
            model: UserRol,
            key: 'idUserRol'
        }
    }
}, {
    tableName: 'users',
    timestamps: false
});

// Un rol puede estar asociado a muchos usuarios
UserRol.hasMany(User, { foreignKey: 'userRol' });

// Un usuario pertenece a un rol
User.belongsTo(UserRol, { foreignKey: 'userRol' });

module.exports = User;