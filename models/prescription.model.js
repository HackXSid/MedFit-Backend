'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('prescription', {
        diagnosis: {
            type: DataTypes.STRING,
        },
        tests: {
            type: DataTypes.TEXT,
        },
        medicine: {
            type: DataTypes.TEXT,
        },
        expiry: {
            type: DataTypes.DATEONLY,
        },
        others: {
            type: DataTypes.TEXT,
        },
    });
};
