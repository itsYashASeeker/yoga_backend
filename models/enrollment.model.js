const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Participant = require('./participant.model');
const Batch = require('./batch.model');

const Enrollment = sequelize.define('Enrollment', {
    enrollment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    enrollment_month: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enrollment_status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
});

Enrollment.belongsTo(Participant, { foreignKey: 'participant_id' });
Enrollment.belongsTo(Batch, { foreignKey: 'batch_id' });

module.exports = Enrollment;
