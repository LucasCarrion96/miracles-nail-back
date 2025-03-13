const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const User = require('./userModel');
const Service = require('./serviceModel');
const Schedule = require('./scheduleModel');
const PaymentStatus = require('./paymentStatusModel'); // Asegúrate de importar el modelo correctamente

const Turns = sequelize.define('Turns', {
    idTurns: {
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
    idService: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'idService'
        }
    },
    idServiceAdd: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'idService'
        }
    },
    nailArtQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    caricatureQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    '3dQuantity': {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
        defaultValue: 1 // Asumiendo que "1" corresponde a "pending" en payment_status
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'turns',
    timestamps: false
});

// Definir las relaciones
User.hasMany(Turns, { foreignKey: 'idUser' });
Turns.belongsTo(User, { foreignKey: 'idUser' });

Service.hasMany(Turns, { foreignKey: 'idService' });
Turns.belongsTo(Service, { foreignKey: 'idService' });


Service.hasMany(Turns, { foreignKey: 'idServiceAdd', as: 'AdditionalService' });
Turns.belongsTo(Service, { foreignKey: 'idServiceAdd', as: 'AdditionalService' });


Schedule.hasMany(Turns, { foreignKey: 'idSchedule' });
Turns.belongsTo(Schedule, { foreignKey: 'idSchedule' });

PaymentStatus.hasMany(Turns, { foreignKey: 'idPaymentStatus' }); // Relación de uno a muchos
Turns.belongsTo(PaymentStatus, { foreignKey: 'idPaymentStatus' }); // Relación de muchos a uno

module.exports = Turns;