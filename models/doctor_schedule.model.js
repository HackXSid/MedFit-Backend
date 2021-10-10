'use strict';

const { DataTypes } = require('sequelize');
const { daysOfWeek } = require('../constants/constants');
module.exports = (sequelize) => {
    sequelize.define('doctor_schedule', {
        day_of_week: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [daysOfWeek],
            },
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        isVirtual: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number_of_patients: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
