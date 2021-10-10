'use strict';

const { DataTypes } = require('sequelize');
const { bookingStatus } = require('../constants/constants');
module.exports = (sequelize) => {
    sequelize.define('patient_booking', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [bookingStatus],
            },
        },
        message: {
            type: DataTypes.STRING,
        },
    });
};
