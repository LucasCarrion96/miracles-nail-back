
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                is: /^[0-9]{10,15}$/ // Validación básica de teléfono
            }
        },
        birthDate: {
            type: DataTypes.DATEONLY, // Usar DATEONLY para solo fecha
            allowNull: false
        },
        profilePicture: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true // Opcional: validar si es URL
            }
        },
        userPass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN, // Mejor como booleano
            defaultValue: true
        },
        userRol: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recoveryCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        recoveryExpires: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'users',
        timestamps: false,
    });

    User.associate = (models) => {
        User.belongsTo(models.UserRol, { foreignKey: 'userRol' });
        User.hasMany(models.UserCourse, { foreignKey: 'idUser' });
        User.hasMany(models.UserHealthCondition, { foreignKey: 'idUser' });
        // Agrega aquí otras relaciones si existen
        User.belongsToMany(models.Course, {
            through: models.UserCourse,
            foreignKey: 'idUser',
            otherKey: 'idCourse'
        });
    };

    return User;
};