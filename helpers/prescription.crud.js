'use strict';

const sequelize = require('../models/');

const { prescription } = sequelize.models;

const prescriptionCreate = async (
    diagnosis,
    tests,
    medicine,
    expiry,
    others,
    doctorId,
    userEmail,
) => {
    await prescription.create({
        diagnosis,
        tests,
        medicine,
        expiry,
        others,
        doctorId,
        userEmail,
    });
};

const prescriptionGet = async (id) => {
    return await prescription.findByPk(id, {
        raw: true,
    });
};

const prescriptionGetAllDoctor = async (doctorId) => {
    return await prescription.findAll({ raw: true, where: { doctorId } });
};

const prescriptionGetAllUser = async (userEmail) => {
    return await prescription.findAll({ raw: true, where: { userEmail } });
};

module.exports = {
    prescriptionCreate,
    prescriptionGetAllDoctor,
    prescriptionGetAllUser,
    prescriptionGet,
};
