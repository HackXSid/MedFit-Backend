'use strict';

const express = require('express');
const {
    getPrescription,
    getPrescriptionByPatient,
} = require('../controllers/prescription.controller');

const router = express.Router();

router.route('/getPrescription').get(getPrescription);
router.route('/getPrescriptions').get(getPrescriptionByPatient);

module.exports = { router };
