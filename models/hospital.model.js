'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('hospital', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact_number: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        secondary_contact_number: {
            type: DataTypes.STRING(16),
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
};
