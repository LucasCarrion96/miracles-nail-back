export default (sequelize, DataTypes) => {
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
        }
    }, {
        tableName: 'art_types',
        timestamps: false,
    });

    // Si este modelo tiene relaciones, añade este método:
    ArtType.associate = (models) => {
        // Ejemplo de relación (descomenta si es necesario):
        // ArtType.hasMany(models.Turns, { foreignKey: 'idArtType' });
    };

    return ArtType;
};