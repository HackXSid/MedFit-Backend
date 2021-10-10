'use strict';

const sequelize = require('../models/');

const { user, doctor, hospital } = sequelize.models;

const doctorCreate = async (
    yoe,
    medical_contact_number,
    degree,
    typeOfDoctor,
    isVerified,
    userEmail,
    hospitalId,
) => {
    await doctor.create({
        yoe,
        medical_contact_number,
        degree,
        typeOfDoctor,
        isVerified,
        userEmail,
        hospitalId,
    });
};

const doctorGet = async (id) => {
    return await doctor.findByPk(id, {
        include: [{ model: user }, { model: hospital, as: 'hospital' }],
    });
};

const doctorByEmail = async (userEmail) => {
    return await doctor.findOne({
        where: { userEmail },
        include: [{ model: user }, { model: hospital, as: 'hospital' }],
    });
};

const doctorFilter = async (typeOfDoctor = null, hospitalId = null) => {
    if (typeOfDoctor && hospitalId)
        return await doctor.findAll({
            where: {
                typeOfDoctor: typeOfDoctor,
                hospitalId: hospitalId,
            },
        });
    if (typeOfDoctor)
        return await doctor.findAll({
            where: {
                typeOfDoctor: typeOfDoctor,
            },
            include: { all: true, nested: true },
        });
    return await doctor.findAll({
        where: {
            hospitalId: hospitalId,
        },
    });
};

const doctorUpdate = async (
    docId,
    yoe,
    medical_contact_number,
    degree,
    typeOfDoctor,
    isVerified,
    hospitalId,
) => {
    const doc = doctorGet(docId);
    if (doc) {
        doc.yoe = yoe;
        doc.medical_contact_number = medical_contact_number;
        doc.degree = degree;
        doc.typeOfDoctor = typeOfDoctor;
        doc.isVerified = isVerified;
        doc.hospitalId = hospitalId;
        await doc.save();
    }
};

module.exports = { doctorCreate, doctorGet, doctorFilter, doctorUpdate, doctorByEmail };
