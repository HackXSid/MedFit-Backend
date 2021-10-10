'use strict';

const sequelize = require('../models/');

const { hospital } = sequelize.models;

const hospitalCreate = async (
    name,
    contact_number,
    secondary_contact_number,
    address,
) => {
    await hospital.create({
        name,
        contact_number,
        secondary_contact_number,
        address,
    });
};

const hospitalGet = async (name) => {
    return await hospital.findOne({ where: { name: name }, raw: true });
};

const hospitalGetAll = async () => {
    return await hospital.findAll({ raw: true });
};

module.exports = { hospitalCreate, hospitalGet, hospitalGetAll };
