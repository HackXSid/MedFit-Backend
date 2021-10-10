'use strict';

const { DataTypes } = require('sequelize');
const { typeOfDoctors } = require('../constants/constants');

const dotenvfile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({ path: dotenvfile });

module.exports = (sequelize) => {
    sequelize.define('doctor', {
        yoe: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        medical_contact_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        degree: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        typeOfDoctor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [typeOfDoctors],
            },
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            default: false,
        },
        meetingLink: {
            type: DataTypes.STRING,
            defaultValue: process.env.DEFAULT_MEETING_LINK,
        },
    });
};
