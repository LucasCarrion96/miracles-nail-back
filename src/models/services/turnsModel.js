export default (sequelize, DataTypes) => {
    const Turns = sequelize.define('Turns', {
        idTurns: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idService: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idServiceAdd: {
            type: DataTypes.INTEGER,
            allowNull: true // 👈 Si es opcional
        },
        nailArtQuantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        caricatureQuantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        '3dQuantity': {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        idSchedule: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        turnDay: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idPaymentStatus: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'turns',
        timestamps: false,
    });

    // Relaciones (sin 'as' por ahora)

    Turns.associate = (models) => {
        Turns.belongsTo(models.User, {
            foreignKey: 'idUser'
        });

        // Alias para servicio principal
        Turns.belongsTo(models.Service, {
            foreignKey: 'idService',
            as: 'MainService'
        });

        // Alias para servicio adicional
        Turns.belongsTo(models.Service, {
            foreignKey: 'idServiceAdd',
            as: 'AdditionalService'
        });

        Turns.belongsTo(models.Schedule, {
            foreignKey: 'idSchedule'
        });

        Turns.belongsTo(models.PaymentStatus, {
            foreignKey: 'idPaymentStatus'
        });
    };

    return Turns;
};