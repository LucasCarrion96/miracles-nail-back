const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Importa la instancia de Sequelize

const Course = sequelize.define('Course', {
    idCourse: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timeClose: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'courses',
    timestamps: false
});

module.exports = Course;
