'use strict';

const sequelize = require('../models/');

const { doctor_schedule } = sequelize.models;

const scheduleCreate = async (
    day_of_week,
    start_time,
    end_time,
    isVirtual,
    address,
    number_of_patients,
    doctorId,
) => {
    await doctor_schedule.create({
        day_of_week,
        start_time,
        end_time,
        isVirtual,
        address,
        number_of_patients,
        doctorId,
    });
};

const scheduleDelete = async (schedule_id) => {
    await doctor_schedule.destroy({ where: { id: schedule_id } });
};

const scheduleGet = async (schedule_id) => {
    return await doctor_schedule.findByPk(schedule_id, { raw: true });
};

const scheduleGetByDoctor = async (doctor_id) => {
    return await doctor_schedule.findAll({ where: { doctorId: doctor_id }, raw: true });
};

const scheduleGetByDoctorAndDay = async (doctor_id, day_of_week) => {
    return await doctor_schedule.findAll({
        where: { doctorId: doctor_id, day_of_week },
        raw: true,
    });
};

module.exports = {
    scheduleCreate,
    scheduleDelete,
    scheduleGet,
    scheduleGetByDoctor,
    scheduleGetByDoctorAndDay,
};
