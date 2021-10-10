'use strict';

const express = require('express');
const {
    getSchedules,
    getAppointments,
    createSchedule,
    deleteSchedule,
    getPrescriptions,
} = require('../controllers/doctor.controller');
const {
    createPrescription,
    getPrescriptionByDoctor,
} = require('../controllers/prescription.controller');
const router = express.Router();

const doctorOnly = (req, res, next) => {
    if (req.user.userType === 'Doctor') next();
    else res.status(404).send({ message: 'Not Authorized' });
};

router.route('*').all(doctorOnly);

router.route('/getSchedules').get(getSchedules);
router.route('/getAppointments').get(getAppointments);
router.route('/createSchedule').post(createSchedule);
router.route('/deleteSchedule').post(deleteSchedule);
router.route('/createPrescription').post(createPrescription);
router.route('/getPrescriptions').get(getPrescriptionByDoctor);
router.route('/getHistory').get(getPrescriptions);

module.exports = { router };
