export default (sequelize, DataTypes) => {
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
    return HealthCondition
}