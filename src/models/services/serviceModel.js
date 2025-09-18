export default (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        idService: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameService: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // Agrega otros campos necesarios
    }, {
        tableName: 'services',
        timestamps: false
    });
    return Service
}