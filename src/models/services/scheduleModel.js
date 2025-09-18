export default (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        idSchedule: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        timeSchedule: {
            type: DataTypes.TIME,
            allowNull: false
        },

        // Agrega otros campos necesarios
    }, {
        tableName: 'schedule',
        timestamps: false
    });
    return Schedule
}