const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Importa la instancia de Sequelize
const User = require('./userModel');
const Course = require('./coursesModel');

const UserCourse = sequelize.define('UserCourse', {
    idUserCourse: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'idUser'
        }
    },
    idCourse: {
        type: DataTypes.INTEGER,
        references: {
            model: Course,
            key: 'idCourse'
        }
    }
}, {
    tableName: 'user_courses',
    timestamps: false
});

// Definir las relaciones
User.belongsToMany(Course, { through: UserCourse, foreignKey: 'idUser' });
Course.belongsToMany(User, { through: UserCourse, foreignKey: 'idCourse' });
UserCourse.belongsTo(Course, { foreignKey: 'idCourse' });
Course.hasMany(UserCourse, { foreignKey: 'idCourse' });
module.exports = UserCourse;
