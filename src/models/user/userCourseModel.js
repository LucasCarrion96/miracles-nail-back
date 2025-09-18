export default (sequelize, DataTypes) => {
    const UserCourse = sequelize.define('UserCourse', {
        idUserCourse: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCourse: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'user_courses',
        timestamps: false,
    });

    UserCourse.associate = (models) => {
        UserCourse.belongsTo(models.User, { foreignKey: 'idUser' });
        UserCourse.belongsTo(models.Course, { foreignKey: 'idCourse' });
    };

    return UserCourse;
};