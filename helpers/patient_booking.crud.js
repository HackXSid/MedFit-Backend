'use strict';

const sequelize = require('../models/');

const { patient_booking } = sequelize.models;

const bookingCreate = async (date, status, message, doctorScheduleId, userEmail) => {
    await patient_booking.create({
        date,
        status,
        message,
        doctorScheduleId,
        userEmail,
    });
};

const bookingDelete = async (booking_id) => {
    await patient_booking.destroy({ where: { id: booking_id } });
};

const bookingGet = async (id) => {
    return await patient_booking.findByPk(id, { raw: true });
};

const bookingGetAll = async (userEmail) => {
    return await patient_booking.findAll({ raw: true, where: { userEmail } });
};

const bookingUpdate = async (id, status, message) => {
    const booking = await bookingGet(id);
    if (booking) {
        booking.status = status;
        booking.message = message;
        await booking.save();
    }
};

const bookingGetBySchedule = async (doctorScheduleId) => {
    return await patient_booking.findAll({
        raw: true,
        where: { doctorScheduleId },
        // include: { all: true, nested: true },
    });
};

module.exports = {
    bookingCreate,
    bookingDelete,
    bookingGet,
    bookingUpdate,
    bookingGetBySchedule,
    bookingGetAll,
};
