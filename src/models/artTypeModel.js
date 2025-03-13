const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Importa la instancia de Sequelize

const ArtType = sequelize.define('ArtType', {
    idArtType: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    artTypeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, {
    tableName: 'art_types',
    timestamps: false
});

module.exports = ArtType;
