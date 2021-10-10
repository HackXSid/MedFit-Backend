'use strict';

const { DataTypes } = require('sequelize');
const { hash } = require('../utils/encryptDecrypt');
const { genders, userTypes } = require('../constants/constants');

module.exports = (sequelize) => {
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('password', hash(value));
            },
            validate: {
                is: /^\w{6,}$/,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [genders],
            },
        },
        address: {
            type: DataTypes.TEXT,
        },
        emergency_phone_number: {
            type: DataTypes.STRING(16),
        },
        userType: {
            type: DataTypes.STRING,
            validate: {
                isIn: [userTypes],
            },
        },
    });
};
