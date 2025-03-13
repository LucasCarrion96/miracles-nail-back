const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const Turns = require('./turnsModel');

const PaymentStatus = sequelize.define('PaymentStatus', {
    idPaymentStatus: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'payment_status',
    timestamps: false
});



module.exports = PaymentStatus;