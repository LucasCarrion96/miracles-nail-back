export default (sequelize, DataTypes) => {
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

    return PaymentStatus
}