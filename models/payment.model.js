const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Participant = require('./participant.model');

const Payment = sequelize.define('Payment', {
    payment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    payment_amount: {
        type: DataTypes.FLOAT,
        defaultValue: 500.0,
    },
    payment_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    payment_for_month: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Payment.belongsTo(Participant, { foreignKey: 'participant_id' });

module.exports = Payment;
